import Link from "next/link";
import { Upload } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ReportView } from "@/components/ReportView";
import { StatusBadge } from "@/components/StatusBadge";
import { requireRole } from "@/lib/auth";
import { getClientById } from "@/lib/data";
import { toggleReportPublishAction, updateClientAction, uploadReportPdfAction } from "@/app/admin/actions";

export default async function AdminClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const profile = await requireRole("admin");
  const { id } = await params;
  const client = await getClientById(id);
  const latest = [...(client?.reports || [])].sort((a, b) => b.evaluation_date.localeCompare(a.evaluation_date))[0];

  if (!client) {
    return <AppShell profile={profile}><p>クライアントが見つかりません。</p></AppShell>;
  }

  return (
    <AppShell profile={profile}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="label">Client Detail</p>
          <h1 className="mt-1 text-3xl font-black text-joynity-900">{client.name}</h1>
          <p className="mt-2 text-sm text-slate-600">{client.sport || "-"} / {client.team || "-"}</p>
        </div>
        <Link href="/admin/reports/new" className="btn-primary">このクライアントのレポートを作成</Link>
      </div>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-5">
          <div className="card p-6">
            <h2 className="text-lg font-black text-joynity-900">基本情報編集</h2>
            <form action={updateClientAction} className="mt-4 grid gap-3">
              <input type="hidden" name="client_id" value={client.id} />
              <Input name="name" label="名前" value={client.name} />
              <Input name="height" label="身長" value={`${client.height ?? ""}`} />
              <Input name="weight" label="体重" value={`${client.weight ?? ""}`} />
              <Input name="sport" label="競技" value={client.sport || ""} />
              <Input name="team" label="所属" value={client.team || ""} />
              <label className="grid gap-1 text-sm font-bold text-slate-700">
                メモ
                <textarea name="notes" className="input min-h-24" defaultValue={client.notes || ""} />
              </label>
              <button className="btn-secondary" type="submit">保存する</button>
            </form>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-black text-joynity-900">PDFアップロード</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Supabase Storage設定後、PDFをアップロードしてクライアント画面へ公開できます。</p>
            {latest ? (
              <form action={uploadReportPdfAction} className="mt-4 grid gap-3">
                <input type="hidden" name="client_id" value={client.id} />
                <input type="hidden" name="report_id" value={latest.id} />
                <input className="input" type="file" name="pdf" accept="application/pdf" />
                <button className="btn-secondary gap-2" type="submit"><Upload size={16} />PDFをアップロード</button>
              </form>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="card p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-black text-joynity-900">レポート一覧</h2>
              <StatusBadge value={latest?.is_published ?? false} />
            </div>
            <div className="mt-4 grid gap-3">
              {(client.reports || []).map((report) => (
                <div key={report.id} className="rounded-lg border border-slate-100 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-joynity-900">{report.title}</strong>
                    <StatusBadge value={report.is_published} />
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{report.evaluation_date} / {report.risk_level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {latest ? (
        <div className="mt-6 grid gap-4">
          <form action={toggleReportPublishAction} className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <input type="hidden" name="client_id" value={client.id} />
            <input type="hidden" name="report_id" value={latest.id} />
            <input type="hidden" name="next_value" value={String(!latest.is_published)} />
            <p className="text-sm font-bold text-slate-700">現在の公開状態: <StatusBadge value={latest.is_published} /></p>
            <button className="btn-secondary" type="submit">{latest.is_published ? "非公開にする" : "公開する"}</button>
          </form>
          <ReportView report={latest} showAdminControls />
        </div>
      ) : null}
    </AppShell>
  );
}

function Input({ name, label, value }: { name: string; label: string; value: string }) {
  return (
    <label className="grid gap-1 text-sm font-bold text-slate-700">
      {label}
      <input name={name} className="input" defaultValue={value} />
    </label>
  );
}
