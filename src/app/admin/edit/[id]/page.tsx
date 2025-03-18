import EditPostForm from "@/app/components/EditPostForm";
import { Post } from "../../../api/posts/data";
import { notFound } from "next/navigation";

async function getPost(id: string): Promise<Post> {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    }/api/posts/${id}`,
    {
      // Don't cache this request when we're in the admin section
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getPost(id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <div className="mb-6 bg-yellow-800 p-4 rounded border border-yellow-900">
        <h2 className="font-semibold">ISR Demo Info</h2>
        <p className="text-sm">
          This admin page demonstrates how you can update content that will then
          be reflected in the statically generated pages. After editing, visit
          the blog post to see the update. You&apos;ll notice that the changes
          appear without having to rebuild the entire site.
        </p>
      </div>

      <EditPostForm post={post} />
    </div>
  );
}
