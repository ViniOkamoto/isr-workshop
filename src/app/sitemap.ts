import { getAllPosts } from "./api/posts/data";
import { MetadataRoute } from "next";
import { revalidatePath } from "next/cache";

export const revalidate = 60; // Revalidate the sitemap every 60 seconds

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const posts = getAllPosts();

  // Force revalidation of the sitemap path
  revalidatePath("/sitemap.xml");

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ] as MetadataRoute.Sitemap;

  // Add blog post routes
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.6,
  })) as MetadataRoute.Sitemap;

  return [...routes, ...postRoutes];
}
