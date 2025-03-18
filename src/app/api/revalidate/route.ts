import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/sitemap.xml";

  // Revalidate the path
  revalidatePath(path);

  return NextResponse.json({
    revalidated: true,
    message: `Path ${path} revalidated at ${new Date().toISOString()}`,
    now: Date.now(),
  });
}
