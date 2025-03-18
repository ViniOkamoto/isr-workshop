import Link from "next/link";
import { Post } from "../api/posts/data";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold">
            <Link
              href={`/blog/${post.id}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </h3>
          <p className="text-gray-500 text-sm mt-1">{post.date}</p>
          <p className="mt-2">{post.content.substring(0, 150)}...</p>
        </div>
      ))}
    </div>
  );
}
