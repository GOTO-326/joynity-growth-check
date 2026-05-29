import Link from "next/link";
import { Download, Dumbbell, HeartPulse, MessageSquare, ShieldCheck, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import type { Report } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";

export function ReportView({ report }: { report: Report; showAdminControls?: boolean }) {
  const pdfHref = report.pdf_url
    ? report.pdf_url.startsWith("http")
      ? report.pdf_url
      : `/api/report-pdf?path=${encodeURIComponent(report.pdf_url)}`
    : "";

  return (
    <article className="grid gap-5">
      <section className="card overflow-hidden">
        <div className="bg-gradient-to-br from-joynity-500 to-joynity-700 px-6 py-7 text-white">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold opacity-85">{report.evaluation_date}</p>
              <h1 className="mt-2 text-2xl font-black sm:text-3xl">{report.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 opacity-95">
                {report.summary || "今回の成長段階と身体機能を、保護者にも分かりやすく整理したレポートです。"}
              </p>
            </div>
            <StatusBadge value={report.is_published} />
          </div>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-3">
          <SummaryTile label="成長段階" value={report.growth_stage || "未設定"} icon={<TrendingUp size={20} />} />
          <SummaryTile label="怪我リスク" value={report.risk_level || "未設定"} icon={<ShieldCheck size={20} />} />
          <SummaryTile label="身長・体重" value={`${report.height ?? "-"}cm / ${report.weight ?? "-"}kg`} icon={<HeartPulse size={20} />} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <InfoCard title="1. 今回の評価まとめ" body={report.summary} />
        <InfoCard title="2. 成長段階" body={report.echo_findings} />
        <InfoCard title="3. 身体の特徴" body={report.posture_findings} />
        <InfoCard title="4. 怪我予防のポイント" body={report.movement_findings} />
        <InfoCard title="5. 改善エクササイズ" body={report.exercise_menu} icon={<Dumbbell size={18} />} />
        <InfoCard title="6. 次回までに意識すること" body={report.advice} />
      </section>

      <section className="card p-6">
        <div className="flex items-center gap-2 text-joynity-700">
          <MessageSquare size={18} />
          <h2 className="text-lg font-black">7. Joynityからのコメント</h2>
        </div>
        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
          {report.advice || "成長期の変化に合わせて、痛み・疲労・動作・栄養回復を定期的に確認していきましょう。"}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {pdfHref ? (
            <Link href={pdfHref} className="btn-primary gap-2" target="_blank">
              <Download size={16} />
              PDF閲覧・ダウンロード
            </Link>
          ) : (
            <span className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-500">PDF未アップロード</span>
          )}
        </div>
      </section>
    </article>
  );
}

function SummaryTile({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-lg border border-joynity-100 bg-joynity-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-joynity-700">
        {icon}
        <span className="text-xs font-black uppercase tracking-wide">{label}</span>
      </div>
      <strong className="text-lg font-black text-joynity-900">{value}</strong>
    </div>
  );
}

function InfoCard({ title, body, icon }: { title: string; body: string | null; icon?: ReactNode }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 text-joynity-700">
        {icon}
        <h2 className="font-black">{title}</h2>
      </div>
      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
        {body || "まだ入力されていません。管理者画面から編集できます。"}
      </p>
    </div>
  );
}
