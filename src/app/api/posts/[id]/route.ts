import { getPostById, updatePost } from "../data";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const post = getPostById(id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const id = (await params).id;
  const post = getPostById(id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  try {
    const updatedPost = updatePost({ ...post, ...body, id: id });

    // Revalidate the sitemap and blog pages
    revalidatePath("/sitemap.xml");
    revalidatePath("/blog");
    revalidatePath(`/blog/${id}`);
    revalidatePath("/sitemap-demo");

    return NextResponse.json(updatedPost);
  } catch {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
