import PostList from "../components/PostList";
import { Post, getAllPosts } from "../api/posts/data";

// This function is used to fetch data from our API
async function getPosts(): Promise<Post[]> {
  // Always use direct data import in production to avoid build issues on Vercel
  if (process.env.NODE_ENV === "production") {
    return getAllPosts();
  }

  // In development, we can use fetch with ISR
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/posts`,
      {
        // Enable ISR with a revalidation time of 60 seconds
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  } catch (error) {
    console.error("Fetch failed, falling back to direct data import:", error);
    // Fallback to direct data import if fetch fails
    return getAllPosts();
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Blog</h1>
      <p className="mb-8 text-gray-600">
        This page demonstrates Incremental Static Regeneration (ISR). It&apos;s
        statically generated at build time but will update every 60 seconds if
        there are new requests.
      </p>
      <PostList posts={posts} />
    </div>
  );
}
