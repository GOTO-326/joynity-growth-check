export type Role = "admin" | "client";

export type Profile = {
  id: string;
  user_id: string;
  role: Role;
  name: string;
  email: string;
  birthdate: string | null;
  gender: string | null;
  team: string | null;
  parent_name: string | null;
  phone: string | null;
  created_at: string;
};

export type Client = {
  id: string;
  profile_id: string | null;
  name: string;
  birthdate: string | null;
  gender: string | null;
  height: number | null;
  weight: number | null;
  sport: string | null;
  team: string | null;
  notes: string | null;
  created_at: string;
};

export type Report = {
  id: string;
  client_id: string;
  title: string;
  evaluation_date: string;
  height: number | null;
  weight: number | null;
  growth_stage: string | null;
  echo_findings: string | null;
  posture_findings: string | null;
  movement_findings: string | null;
  risk_level: string | null;
  summary: string | null;
  advice: string | null;
  exercise_menu: string | null;
  pdf_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ClientWithReports = Client & {
  reports?: Report[];
};

