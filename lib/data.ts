import { createClientServer, hasSupabaseEnv } from "@/lib/supabase";
import { demoClients, demoReports } from "@/lib/mock-data";
import type { ClientWithReports, Report } from "@/lib/types";

export async function getAdminClients(): Promise<ClientWithReports[]> {
  if (!hasSupabaseEnv()) return demoClients;
  const supabase = await createClientServer();
  const { data, error } = await supabase
    .from("clients")
    .select("*, reports(*)")
    .order("created_at", { ascending: false });
  if (error) return demoClients;
  return (data || []) as ClientWithReports[];
}

export async function getClientById(id: string): Promise<ClientWithReports | null> {
  if (!hasSupabaseEnv()) return demoClients.find((client) => client.id === id) ?? demoClients[0];
  const supabase = await createClientServer();
  const { data } = await supabase.from("clients").select("*, reports(*)").eq("id", id).single();
  return data as ClientWithReports | null;
}

export async function getClientReports(profileId: string): Promise<Report[]> {
  if (!hasSupabaseEnv()) return demoReports.filter((report) => report.is_published);
  const supabase = await createClientServer();
  const { data } = await supabase
    .from("clients")
    .select("reports(*)")
    .eq("profile_id", profileId)
    .single();
  const reports = (data?.reports || []) as Report[];
  return reports.filter((report) => report.is_published);
}

export async function getReportById(id: string): Promise<Report | null> {
  if (!hasSupabaseEnv()) return demoReports.find((report) => report.id === id) ?? demoReports[0];
  const supabase = await createClientServer();
  const { data } = await supabase.from("reports").select("*").eq("id", id).single();
  return data as Report | null;
}

