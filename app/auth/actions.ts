"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClientServer, hasSupabaseEnv } from "@/lib/supabase";

function stringValue(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function signInAction(formData: FormData) {
  const email = stringValue(formData, "email");
  const password = stringValue(formData, "password");
  const role = stringValue(formData, "role") || "client";

  if (!hasSupabaseEnv()) {
    redirect(role === "admin" ? "/admin/dashboard" : "/client/dashboard");
  }

  const supabase = await createClientServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?message=${encodeURIComponent(error.message)}`);

  const { data: auth } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", auth.user?.id)
    .single();

  revalidatePath("/", "layout");
  redirect(profile?.role === "admin" ? "/admin/dashboard" : "/client/dashboard");
}

export async function registerAction(formData: FormData) {
  const email = stringValue(formData, "email");
  const password = stringValue(formData, "password");
  const name = stringValue(formData, "name");

  if (!hasSupabaseEnv()) redirect("/client/dashboard");

  const supabase = await createClientServer();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, role: "client" } }
  });

  if (error) redirect(`/register?message=${encodeURIComponent(error.message)}`);

  if (data.user) {
    await supabase.from("profiles").upsert({
      user_id: data.user.id,
      role: "client",
      name,
      email
    });
  }

  redirect("/client/dashboard");
}

export async function resetPasswordAction(formData: FormData) {
  const email = stringValue(formData, "email");

  if (!hasSupabaseEnv()) redirect("/forgot-password?message=Demo mode: Supabase設定後に送信できます");

  const supabase = await createClientServer();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login`
  });

  if (error) redirect(`/forgot-password?message=${encodeURIComponent(error.message)}`);
  redirect("/forgot-password?message=パスワード再設定メールを送信しました");
}

export async function signOutAction() {
  if (hasSupabaseEnv()) {
    const supabase = await createClientServer();
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/login");
}

