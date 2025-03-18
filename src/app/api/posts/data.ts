export type Post = {
  id: string;
  title: string;
  content: string;
  date: string;
};

// Simulate a database of blog posts
const posts: Post[] = [
  {
    id: "1",
    title: "Understanding ISR in Next.js",
    content:
      "Incremental Static Regeneration (ISR) allows you to create or update static pages after you've built your site. ISR enables you to use static-generation on a per-page basis, without needing to rebuild the entire site.",
    date: "2024-03-18",
  },
  {
    id: "2",
    title: "Benefits of ISR for SEO",
    content:
      "ISR provides the SEO benefits of static generation while maintaining dynamic data. Search engines see fully rendered HTML content, improving indexation and ranking potential.",
    date: "2024-03-19",
  },
  {
    id: "3",
    title: "ISR vs SSR vs SSG",
    content:
      "ISR combines the best of Server-Side Rendering (SSR) and Static Site Generation (SSG). It provides the performance benefits of static content with the freshness of server-rendered content.",
    date: "2024-03-20",
  },
];

export function getAllPosts(): Post[] {
  return [...posts];
}

export function getPostById(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}

export function updatePost(updatedPost: Post): Post {
  const index = posts.findIndex((post) => post.id === updatedPost.id);
  if (index !== -1) {
    posts[index] = updatedPost;
    return updatedPost;
  }
  throw new Error("Post not found");
}

export function addPost(post: Omit<Post, "id">): Post {
  const newId = (posts.length + 1).toString();
  const newPost = { ...post, id: newId };
  posts.push(newPost);
  return newPost;
}
