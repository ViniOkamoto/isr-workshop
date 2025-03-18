# Getting Started

First, run the development server:

```bash
npm i
npm run dev

```

## Incremental Static Regeneration (ISR) Demo

This project demonstrates Incremental Static Regeneration (ISR) in Next.js 15.2.3 and how it can help blogs improve SEO while maintaining dynamic content without rebuilding the entire site.

### What is ISR?

Incremental Static Regeneration allows you to create or update static pages after your site has been built. It enables static generation on a per-page basis, providing the SEO benefits of pre-rendered HTML with the freshness of server-side rendering.

### Key Features

- **Static Pages with Dynamic Updates**: Pages are pre-rendered at build time but can be updated without rebuilding the site
- **Revalidation**: Content automatically refreshes after a specified period (60 seconds in this demo)
- **On-demand Revalidation**: Content can be immediately refreshed when updated
- **Dynamic Sitemap**: The sitemap automatically includes new content without rebuilding

### Key Components

1. **Blog Post Pages with ISR**:

```typescript
// src/app/blog/[id]/page.tsx
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
  // ...
}
```

2. **Sitemap with Revalidation**:

```typescript
// src/app/sitemap.ts
export const revalidate = 60; // Revalidate the sitemap every 60 seconds

export default function sitemap(): MetadataRoute.Sitemap {
  // ...
  revalidatePath("/sitemap.xml"); // Force revalidation
  // ...
}
```

3. **On-demand Revalidation in API Routes**:

```typescript
// src/app/api/posts/route.ts (POST method)
// Revalidate the sitemap and blog pages
revalidatePath("/sitemap.xml");
revalidatePath("/blog");
revalidatePath(`/blog/${newPost.id}`);
revalidatePath("/sitemap-demo");
```

### How to Test the ISR Demo

1. **Build and Start the Production Server**:

```bash
npm run build
npm run start
```

2. **Visit the Demo Pages**:

   - Homepage: [http://localhost:3000](http://localhost:3000)
   - Blog list: [http://localhost:3000/blog](http://localhost:3000/blog)
   - Sitemap demo: [http://localhost:3000/sitemap-demo](http://localhost:3000/sitemap-demo)
   - Sitemap XML: [http://localhost:3000/sitemap.xml](http://localhost:3000/sitemap.xml)

3. **Test Content Updates**:

   - Create a new post: [http://localhost:3000/admin/new](http://localhost:3000/admin/new)
   - Edit an existing post: [http://localhost:3000/admin/edit/1](http://localhost:3000/admin/edit/1)
   - Observe the changes appearing in the blog and sitemap without rebuilding

4. **Verify Revalidation**:
   - Note the "Last generated" timestamp on blog post pages
   - Refresh after 60 seconds to see the updated timestamp
   - Use manual revalidation buttons on the sitemap demo page

### SEO Benefits Demonstrated

1. **Pre-rendered HTML**: All pages are served as static HTML
2. **Fast Load Times**: Pages are served from cache
3. **Content Freshness**: Updates appear without rebuilding
4. **Dynamic Sitemap**: New content is automatically included in sitemap

### Deployment Considerations

When deploying to platforms like Vercel, there are some important considerations:

1. **API Routes During Build**: During the build process, the application cannot fetch from its own API routes because the server isn't running yet. This demo includes workarounds that detect the build environment and use direct data imports instead of fetch calls during build time.

2. **Environment Variables**: For production deployments, set the `NEXT_PUBLIC_SITE_URL` environment variable to your domain (e.g., `https://your-site.vercel.app`) to ensure proper sitemap URL generation.

3. **Database Connection**: In a real-world scenario, you would connect to an actual database rather than using the in-memory data store in this demo. Ensure your database connection strings are properly set as environment variables.

4. **Revalidation Strategy**: This demo uses both time-based revalidation (every 60 seconds) and on-demand revalidation via API routes. In production, you might want to adjust the revalidation period based on your content update frequency.
