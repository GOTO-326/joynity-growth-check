import { NextResponse } from "next/server";
import { createClientServer, hasSupabaseEnv } from "@/lib/supabase";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path");

  if (!path) return NextResponse.json({ error: "path is required" }, { status: 400 });
  if (!hasSupabaseEnv()) return NextResponse.redirect(path);

  const supabase = await createClientServer();
  const { data, error } = await supabase.storage.from("report-pdfs").createSignedUrl(path, 60 * 10);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: error?.message || "PDF not found" }, { status: 404 });
  }

  return NextResponse.redirect(data.signedUrl);
}

