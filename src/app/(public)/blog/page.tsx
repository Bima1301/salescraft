"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "./_server";
import { Post } from "@/app/(protected)/dashboard/post/_server/type";
import BlogCard from "./_components/blog-card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function BlogPage() {
    const { data: blogs = [], isLoading, isError, error } = useQuery<Post[], Error>({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    return (
        <div className="min-h-screen bg-background px-6 py-10">
            <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold tracking-tight mb-4">Blog</h1>
                    <Link href="/" className={buttonVariants({ variant: 'secondary' })}>
                        Back to Home
                    </Link>
                </div>
                {isLoading ? (
                    <p className="text-muted-foreground">Memuat blog...</p>
                ) : isError ? (
                    <p className="text-red-500">Gagal memuat blog: {error?.message}</p>
                ) : blogs.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        Tidak ada blog yang tersedia.
                    </p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} {...blog} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

