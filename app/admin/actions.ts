"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/env";
import { createClientServer } from "@/lib/supabase";

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function numberOrNull(value: string) {
  const number = Number(value);
  return Number.isFinite(number) && value !== "" ? number : null;
}

export async function createReportAction(formData: FormData) {
  const clientId = text(formData, "client_id");

  if (!hasSupabaseEnv()) redirect(`/admin/clients/${clientId || "demo-client-1"}`);

  const supabase = await createClientServer();
  const { error } = await supabase.from("reports").insert({
    client_id: clientId,
    title: text(formData, "title") || `${text(formData, "evaluation_date")} Growth Check レポート`,
    evaluation_date: text(formData, "evaluation_date"),
    height: numberOrNull(text(formData, "height")),
    weight: numberOrNull(text(formData, "weight")),
    growth_stage: text(formData, "growth_stage"),
    echo_findings: text(formData, "echo_findings"),
    posture_findings: text(formData, "posture_findings"),
    movement_findings: text(formData, "movement_findings"),
    risk_level: text(formData, "risk_level"),
    summary: text(formData, "summary"),
    advice: text(formData, "advice"),
    exercise_menu: text(formData, "exercise_menu"),
    is_published: text(formData, "is_published") === "true"
  });

  if (error) redirect(`/admin/reports/new?message=${encodeURIComponent(error.message)}`);
  revalidatePath("/admin/dashboard");
  redirect(`/admin/clients/${clientId}`);
}

export async function updateClientAction(formData: FormData) {
  const clientId = text(formData, "client_id");

  if (!hasSupabaseEnv()) redirect(`/admin/clients/${clientId || "demo-client-1"}`);

  const supabase = await createClientServer();
  await supabase
    .from("clients")
    .update({
      name: text(formData, "name"),
      height: numberOrNull(text(formData, "height")),
      weight: numberOrNull(text(formData, "weight")),
      sport: text(formData, "sport"),
      team: text(formData, "team"),
      notes: text(formData, "notes")
    })
    .eq("id", clientId);

  revalidatePath(`/admin/clients/${clientId}`);
  redirect(`/admin/clients/${clientId}`);
}

export async function uploadReportPdfAction(formData: FormData) {
  const reportId = text(formData, "report_id");
  const clientId = text(formData, "client_id");
  const file = formData.get("pdf") as File | null;

  if (!hasSupabaseEnv() || !file || !reportId) redirect(`/admin/clients/${clientId || "demo-client-1"}`);

  const supabase = await createClientServer();
  const path = `${clientId}/${reportId}/${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage.from("report-pdfs").upload(path, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type || "application/pdf"
  });
  if (uploadError) redirect(`/admin/clients/${clientId}?message=${encodeURIComponent(uploadError.message)}`);

  const { error: updateError } = await supabase.from("reports").update({ pdf_url: path }).eq("id", reportId);
  if (updateError) redirect(`/admin/clients/${clientId}?message=${encodeURIComponent(updateError.message)}`);

  revalidatePath(`/admin/clients/${clientId}`);
  redirect(`/admin/clients/${clientId}`);
}

export async function toggleReportPublishAction(formData: FormData) {
  const reportId = text(formData, "report_id");
  const clientId = text(formData, "client_id");
  const nextValue = text(formData, "next_value") === "true";

  if (!hasSupabaseEnv()) redirect(`/admin/clients/${clientId || "demo-client-1"}`);

  const supabase = await createClientServer();
  await supabase.from("reports").update({ is_published: nextValue }).eq("id", reportId);
  revalidatePath(`/admin/clients/${clientId}`);
  redirect(`/admin/clients/${clientId}`);
}
