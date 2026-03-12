import Elysia from "elysia";
import { posts } from "@/db/schema";
import { db } from "@/index";

export const postsRouter = new Elysia({ prefix: "/posts" }).get(
    "/",
    async () => {
        const postsData = await db.select().from(posts);

        if (!postsData) {
            throw new Response("Posts not found");
        }

        return postsData;
    },
);
