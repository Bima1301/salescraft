import { z } from "zod";
import { salesPages } from "@/db/schema";

export type SalesPage = typeof salesPages.$inferSelect;

export interface GeneratedContent {
    headline: string;
    subHeadline: string;
    productDescription: string;
    benefits: { title: string; description: string }[];
    features: { title: string; description: string; icon: string }[];
    socialProof: { name: string; role: string; quote: string }[];
    pricing: { price: string; period: string; highlights: string[] };
    cta: { text: string; subtext: string };
}

export const salesPageBodySchema = z.object({
    productName: z.string().min(1, "Product name is required"),
    productDescription: z.string().min(10, "Description must be at least 10 characters"),
    features: z.array(z.string()).min(1, "At least one feature is required"),
    targetAudience: z.string().min(1, "Target audience is required"),
    price: z.string().min(1, "Price is required"),
    uniqueSellingPoints: z.array(z.string()),
    template: z.enum(["modern", "bold", "elegant"]),
});

export type SalesPageBodyInput = z.infer<typeof salesPageBodySchema>;

export const salesPagesQueryKey = ["sales-pages"] as const;
