import { getAllPosts } from "../api/posts/data";
import Link from "next/link";

export default function SitemapDemoPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sitemap Demonstration</h1>

      <div className="mb-6 bg-indigo-800 p-4 rounded">
        <h2 className="font-semibold">ISR and Sitemaps</h2>
        <p className="text-sm mb-2">
          One benefit of ISR is that your sitemap can automatically include all
          your pages, including dynamically generated ones. This helps search
          engines discover and index all your content.
        </p>
        <p className="text-sm mb-2">
          With ISR, when you add new content, it can automatically be included
          in your sitemap without requiring a full rebuild of your site.
        </p>
        <p className="text-sm mt-3 border-t pt-2 border-indigo-700">
          This page was generated at: {new Date().toLocaleString()}
        </p>
        <Link
          href="/sitemap.xml"
          target="_blank"
          className="text-blue-600 hover:underline text-sm"
        >
          View Raw Sitemap XML
        </Link>
      </div>

      <div className="border rounded-md p-4">
        <h2 className="text-xl font-semibold mb-4">Sitemap Contents</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Static Routes</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <Link href="/" className="text-blue-600 hover:underline">
                  {baseUrl}
                </Link>
                <span className="text-sm text-gray-500 ml-2">
                  Priority: 1.0
                </span>
              </li>
              <li>
                <Link href="/blog" className="text-blue-600 hover:underline">
                  {`${baseUrl}/blog`}
                </Link>
                <span className="text-sm text-gray-500 ml-2">
                  Priority: 0.8
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">Dynamic Blog Posts</h3>
            <p className="text-sm text-gray-600 mb-2">
              These are automatically added to the sitemap when new posts are
              created.
            </p>
            <ul className="list-disc pl-6 mt-2">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {`${baseUrl}/blog/${post.id}`}
                  </Link>
                  <span className="text-sm text-gray-500 ml-2">
                    Last modified: {post.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Test It Yourself</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <Link href="/admin/new" className="text-blue-600 hover:underline">
              Create a new blog post
            </Link>
          </li>
          <li>
            Visit the sitemap at{" "}
            <code className="bg-gray-800 px-1 py-0.5 rounded">
              /sitemap.xml
            </code>
          </li>
          <li>See that your new post is automatically included</li>
          <li>This happens without rebuilding the entire site!</li>
        </ol>

        <div className="mt-6 p-4 bg-blue-800 rounded-md">
          <h3 className="font-semibold mb-2">Manual Revalidation</h3>
          <p className="text-sm mb-3">
            You can manually trigger revalidation of the sitemap using the API
            route below. This is useful to force an immediate update instead of
            waiting for the 60-second revalidation period.
          </p>
          <div className="flex gap-4">
            <Link
              href="/api/revalidate?path=/sitemap.xml"
              target="_blank"
              className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-sm"
            >
              Revalidate Sitemap
            </Link>
            <Link
              href="/api/revalidate?path=/blog"
              target="_blank"
              className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-sm"
            >
              Revalidate Blog List
            </Link>
          </div>
          <p className="text-xs mt-2">
            After clicking a revalidation link, refresh this page to see the
            updated timestamp.
          </p>
        </div>
      </div>
    </div>
  );
}
