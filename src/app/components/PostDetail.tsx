import Link from "next/link";
import { Post } from "../api/posts/data";

export default function PostDetail({ post }: { post: Post }) {
  return (
    <article className="max-w-2xl mx-auto">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to all posts
      </Link>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date}</p>
      <div className="prose">
        <p>{post.content}</p>
      </div>
    </article>
  );
}
