import Link from "next/link";
import { FileText, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ReportView } from "@/components/ReportView";
import { StatusBadge } from "@/components/StatusBadge";
import { requireRole } from "@/lib/auth";
import { getClientReports } from "@/lib/data";

export default async function ClientDashboardPage() {
  const profile = await requireRole("client");
  const reports = await getClientReports(profile.id);
  const latest = [...reports].sort((a, b) => b.evaluation_date.localeCompare(a.evaluation_date))[0];

  return (
    <AppShell profile={profile}>
      <div className="mb-6">
        <p className="label">Client Dashboard</p>
        <h1 className="mt-1 text-3xl font-black text-joynity-900">自分専用レポート</h1>
        <p className="mt-2 text-sm text-slate-600">公開済みのレポートだけが表示されます。他のクライアント情報は閲覧できません。</p>
      </div>

      {latest ? <ReportView report={latest} /> : (
        <div className="card p-8 text-center">
          <FileText className="mx-auto text-joynity-500" size={44} />
          <h2 className="mt-4 text-xl font-black text-joynity-900">公開済みレポートはまだありません</h2>
          <p className="mt-2 text-sm text-slate-600">管理者がレポートを公開すると、ここに表示されます。</p>
        </div>
      )}

      <section className="card mt-6 p-6">
        <div className="mb-4 flex items-center gap-2 text-joynity-700">
          <TrendingUp size={18} />
          <h2 className="text-lg font-black">過去レポート一覧</h2>
        </div>
        <div className="grid gap-3">
          {reports.map((report) => (
            <Link key={report.id} href={`/client/reports/${report.id}`} className="rounded-lg border border-slate-100 p-4 transition hover:border-joynity-300 hover:bg-joynity-50">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <strong className="text-joynity-900">{report.title}</strong>
                <StatusBadge value={report.risk_level} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{report.evaluation_date} / {report.growth_stage}</p>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

