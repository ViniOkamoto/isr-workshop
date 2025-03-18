import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Incremental Static Regeneration (ISR) Demo
      </h1>

      <div className="prose mb-8">
        <p className="text-xl">
          This demo showcases how Next.js ISR can help blogs improve SEO while
          maintaining dynamic content without rebuilding the entire site.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What is ISR?</h2>
        <p>
          Incremental Static Regeneration (ISR) allows you to create or update
          static pages after you&apos;ve built your site. With ISR, you can use
          static generation on a per-page basis, without rebuilding the entire
          site.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Benefits for SEO</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Pages are pre-rendered at build time with full HTML content</li>
          <li>
            Search engines see complete content without executing JavaScript
          </li>
          <li>Fast page loads with content served from CDN</li>
          <li>Content stays fresh with automatic regeneration</li>
          <li>No server-side rendering required for each request</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How ISR Works</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Pages are statically generated at build time</li>
          <li>The cached version is served for a specified time period</li>
          <li>
            After the revalidation period, the next request triggers a
            regeneration
          </li>
          <li>
            The old page is served while the regeneration happens in the
            background
          </li>
          <li>Once regeneration completes, Next.js serves the updated page</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Link
          href="/blog"
          className="block p-6 bg-blue-800 rounded-lg border border-blue-900 hover:bg-blue-900 transition"
        >
          <h3 className="text-xl font-semibold mb-2">View Blog Demo</h3>
          <p>
            See ISR in action with our demo blog. Pages are regenerated every 60
            seconds.
          </p>
        </Link>

        <Link
          href="/admin/edit/1"
          className="block p-6 bg-green-800 rounded-lg border border-green-900 hover:bg-green-900 transition"
        >
          <h3 className="text-xl font-semibold mb-2">Edit Content</h3>
          <p>
            Make changes to a blog post and see the updates reflected without
            rebuilding.
          </p>
        </Link>
      </div>
    </div>
  );
}
