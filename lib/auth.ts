import { redirect } from "next/navigation";
import { createClientServer, hasSupabaseEnv } from "@/lib/supabase";
import { demoAdminProfile, demoClientProfile } from "@/lib/mock-data";
import type { Profile, Role } from "@/lib/types";

export async function getCurrentProfile(): Promise<Profile | null> {
  if (!hasSupabaseEnv()) return demoAdminProfile;

  const supabase = await createClientServer();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", auth.user.id)
    .single();

  return data as Profile | null;
}

export async function requireRole(role: Role) {
  if (!hasSupabaseEnv()) return demoProfileForRole(role);

  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (profile.role !== role) {
    redirect(profile.role === "admin" ? "/admin/dashboard" : "/client/dashboard");
  }
  return profile;
}

export function demoProfileForRole(role: Role) {
  return role === "admin" ? demoAdminProfile : demoClientProfile;
}
