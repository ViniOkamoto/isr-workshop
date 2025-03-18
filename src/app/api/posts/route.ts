import { getAllPosts, addPost } from "./data";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Add the new post
    const newPost = addPost({
      title: body.title,
      content: body.content,
      date: body.date || new Date().toISOString().split("T")[0], // Use provided date or today
    });

    // Try to revalidate, but don't fail if revalidation fails
    try {
      // Revalidate the sitemap and blog pages
      revalidatePath("/sitemap.xml");
      revalidatePath("/blog");
      revalidatePath(`/blog/${newPost.id}`);
      revalidatePath("/sitemap-demo");
    } catch (error) {
      console.error("Revalidation failed, but continuing:", error);
    }

    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
