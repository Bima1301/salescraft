import { Post } from '@/app/(protected)/dashboard/post/_server/type'

export default function BlogCard({ name, content }: Post) {
    return (
        <div className="rounded-lg border p-4 shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-2">{name}</h2>
            <p className="text-gray-700">{content}</p>
        </div>
    )
}
