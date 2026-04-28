import { Elysia } from "elysia";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import OpenAI from "openai";

import { db } from "@/index";
import { salesPages } from "@/db/schema";
import { betterAuth } from "@/server/protected-route";
import { salesPageBodySchema, type GeneratedContent } from "./type";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateSalesPageContent(data: {
    productName: string;
    productDescription: string;
    features: string[];
    targetAudience: string;
    price: string;
    uniqueSellingPoints: string[];
}): Promise<GeneratedContent> {
    const prompt = `You are an expert copywriter and marketer. Generate a complete, persuasive sales page for the following product/service.

Product/Service: ${data.productName}
Description: ${data.productDescription}
Key Features: ${data.features.join(", ")}
Target Audience: ${data.targetAudience}
Price: ${data.price}
Unique Selling Points: ${data.uniqueSellingPoints.join(", ")}

Generate a JSON response with EXACTLY this structure (no extra fields, no markdown):
{
  "headline": "compelling main headline (max 10 words)",
  "subHeadline": "supporting sub-headline (max 20 words)",
  "productDescription": "engaging 2-3 sentence product description",
  "benefits": [
    {"title": "benefit title", "description": "1-2 sentence benefit description"},
    {"title": "benefit title", "description": "1-2 sentence benefit description"},
    {"title": "benefit title", "description": "1-2 sentence benefit description"}
  ],
  "features": [
    {"title": "feature name", "description": "feature explanation", "icon": "lucide icon name like Zap/Shield/Star/Rocket/CheckCircle/ArrowRight"},
    {"title": "feature name", "description": "feature explanation", "icon": "lucide icon name"},
    {"title": "feature name", "description": "feature explanation", "icon": "lucide icon name"}
  ],
  "socialProof": [
    {"name": "realistic full name", "role": "job title at company", "quote": "convincing testimonial about the product"},
    {"name": "realistic full name", "role": "job title at company", "quote": "convincing testimonial about the product"},
    {"name": "realistic full name", "role": "job title at company", "quote": "convincing testimonial about the product"}
  ],
  "pricing": {
    "price": "${data.price}",
    "period": "one-time or /month or /year",
    "highlights": ["key pricing highlight 1", "key pricing highlight 2", "key pricing highlight 3"]
  },
  "cta": {
    "text": "action-driven CTA button text",
    "subtext": "urgency or value reinforcement text under the button"
  }
}

Make the copy highly persuasive, professional, and tailored to the target audience. Return ONLY valid JSON.`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content generated");

    return JSON.parse(content) as GeneratedContent;
}

export const salesPagesRouter = new Elysia({ prefix: "/sales-pages" })
    .use(betterAuth)
    .get(
        "/public/:id",
        async ({ params }) => {
            const { id } = params;

            const [page] = await db
                .select({
                    id: salesPages.id,
                    productName: salesPages.productName,
                    template: salesPages.template,
                    generatedContent: salesPages.generatedContent,
                    updatedAt: salesPages.updatedAt,
                })
                .from(salesPages)
                .where(eq(salesPages.id, id));

            if (!page) throw new Response("Sales page not found", { status: 404 });
            if (!page.generatedContent)
                throw new Response("Sales page has no generated content", { status: 404 });

            return page;
        },
        {
            auth: false,
            params: z.object({ id: z.string() }),
        },
    )
    .get(
        "/",
        async ({ session }) => {
            const { id: userId } = session.user;
            const pages = await db
                .select()
                .from(salesPages)
                .where(eq(salesPages.userId, userId))
                .orderBy(desc(salesPages.createdAt));
            return pages;
        },
        { auth: true },
    )
    .get(
        "/:id",
        async ({ params, session }) => {
            const { id } = params;
            const { id: userId } = session.user;

            const [page] = await db
                .select()
                .from(salesPages)
                .where(and(eq(salesPages.id, id), eq(salesPages.userId, userId)));

            if (!page) throw new Response("Sales page not found", { status: 404 });
            return page;
        },
        {
            auth: true,
            params: z.object({ id: z.string() }),
        },
    )
    .post(
        "/",
        async ({ body, session }) => {
            const { id: userId } = session.user;
            const {
                productName,
                productDescription,
                features,
                targetAudience,
                price,
                uniqueSellingPoints,
                template,
            } = body;

            const generatedContent = await generateSalesPageContent({
                productName,
                productDescription,
                features,
                targetAudience,
                price,
                uniqueSellingPoints,
            });

            const [page] = await db
                .insert(salesPages)
                .values({
                    userId,
                    productName,
                    productDescription,
                    features,
                    targetAudience,
                    price,
                    uniqueSellingPoints,
                    template,
                    generatedContent,
                })
                .returning();

            if (!page) throw new Response("Internal Error", { status: 500 });
            return page;
        },
        {
            body: salesPageBodySchema,
            auth: true,
        },
    )
    .post(
        "/:id/regenerate",
        async ({ params, body, session }) => {
            const { id } = params;
            const { id: userId } = session.user;
            const { section } = body;

            const [existing] = await db
                .select()
                .from(salesPages)
                .where(and(eq(salesPages.id, id), eq(salesPages.userId, userId)));

            if (!existing) throw new Response("Sales page not found", { status: 404 });

            const currentContent = existing.generatedContent as Record<string, unknown>;

            let updatedContent: Record<string, unknown>;

            if (section && section !== "all") {
                const sectionPrompt = `You are an expert copywriter. Regenerate ONLY the "${section}" section for this product:

Product: ${existing.productName}
Description: ${existing.productDescription}
Target Audience: ${existing.targetAudience}
Price: ${existing.price}

Current full context:
${JSON.stringify(currentContent, null, 2)}

Return a JSON object with ONLY the key "${section}" and its new value. Make it fresh, compelling, and different from before.`;

                const response = await openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [{ role: "user", content: sectionPrompt }],
                    response_format: { type: "json_object" },
                    temperature: 0.9,
                });

                const content = response.choices[0]?.message?.content;
                if (!content) throw new Error("No content generated");

                const partial = JSON.parse(content) as Record<string, unknown>;
                updatedContent = { ...currentContent, ...partial };
            } else {
                const freshContent = await generateSalesPageContent({
                    productName: existing.productName,
                    productDescription: existing.productDescription,
                    features: existing.features,
                    targetAudience: existing.targetAudience,
                    price: existing.price,
                    uniqueSellingPoints: existing.uniqueSellingPoints,
                });
                updatedContent = freshContent as unknown as Record<string, unknown>;
            }

            const [updated] = await db
                .update(salesPages)
                .set({ generatedContent: updatedContent, updatedAt: new Date() })
                .where(and(eq(salesPages.id, id), eq(salesPages.userId, userId)))
                .returning();

            return updated;
        },
        {
            auth: true,
            params: z.object({ id: z.string() }),
            body: z.object({ section: z.string().optional() }),
        },
    )
    .patch(
        "/:id",
        async ({ params, body, session }) => {
            const { id } = params;
            const { id: userId } = session.user;

            const [existing] = await db
                .select()
                .from(salesPages)
                .where(and(eq(salesPages.id, id), eq(salesPages.userId, userId)));
            if (!existing) throw new Response("Sales page not found", { status: 404 });

            const generatedContent = await generateSalesPageContent({
                productName: body.productName,
                productDescription: body.productDescription,
                features: body.features,
                targetAudience: body.targetAudience,
                price: body.price,
                uniqueSellingPoints: body.uniqueSellingPoints,
            });

            const [updated] = await db
                .update(salesPages)
                .set({ ...body, generatedContent, updatedAt: new Date() })
                .where(and(eq(salesPages.id, id), eq(salesPages.userId, userId)))
                .returning();

            if (!updated) throw new Response("Sales page not found", { status: 404 });
            return updated;
        },
        {
            body: salesPageBodySchema,
            auth: true,
            params: z.object({ id: z.string() }),
        },
    )
    .delete(
        "/:id",
        async ({ params, session }) => {
            const { id } = params;
            const { id: userId } = session.user;

            const [deleted] = await db
                .delete(salesPages)
                .where(and(eq(salesPages.id, id), eq(salesPages.userId, userId)))
                .returning();

            if (!deleted) throw new Response("Sales page not found", { status: 404 });
            return deleted;
        },
        {
            auth: true,
            params: z.object({ id: z.string() }),
        },
    );
