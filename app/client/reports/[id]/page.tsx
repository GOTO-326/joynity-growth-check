import { AppShell } from "@/components/AppShell";
import { ReportView } from "@/components/ReportView";
import { requireRole } from "@/lib/auth";
import { getReportById } from "@/lib/data";

export default async function ClientReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const profile = await requireRole("client");
  const { id } = await params;
  const report = await getReportById(id);

  return (
    <AppShell profile={profile}>
      {report && report.is_published ? (
        <ReportView report={report} />
      ) : (
        <div className="card p-8">
          <h1 className="text-xl font-black text-joynity-900">レポートを表示できません</h1>
          <p className="mt-2 text-sm text-slate-600">公開されていない、または閲覧権限がないレポートです。</p>
        </div>
      )}
    </AppShell>
  );
}

