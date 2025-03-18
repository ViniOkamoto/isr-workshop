import { Post } from "../../api/posts/data";
import PostDetail from "../../components/PostDetail";
import { notFound } from "next/navigation";

// This generates the static paths at build time
export async function generateStaticParams() {
  try {
    const posts = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/posts`
    ).then((res) => res.json());

    return posts.map((post: Post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    // Return empty array to prevent build failure
    return [];
  }
}

// This fetches the data for a specific post
async function getPost(id: string): Promise<Post> {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    }/api/posts/${id}`,
    {
      // Enable ISR with a revalidation time of 60 seconds
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getPost(id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 bg-blue-50 p-4 rounded">
        <h2 className="font-semibold">ISR Demo Info</h2>
        <p className="text-sm">
          This page uses Incremental Static Regeneration. It was pre-rendered at
          build time, but can be updated without rebuilding the entire site.
          Check the time below to see when this page was last generated.
        </p>
        <p className="text-sm mt-2">
          Last generated: {new Date().toLocaleString()}
        </p>
      </div>

      <PostDetail post={post} />
    </div>
  );
}
