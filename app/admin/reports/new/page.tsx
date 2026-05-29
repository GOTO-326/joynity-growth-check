import { AppShell } from "@/components/AppShell";
import { requireRole } from "@/lib/auth";
import { getAdminClients } from "@/lib/data";
import { createReportAction } from "@/app/admin/actions";

const fields = [
  ["growth_stage", "成長曲線評価 / 成長段階"],
  ["echo_findings", "エコー評価"],
  ["posture_findings", "姿勢評価"],
  ["movement_findings", "動作評価・身体機能評価"],
  ["exercise_menu", "改善メニュー"],
  ["summary", "今回の評価まとめ"],
  ["advice", "総合コメント・次回までの意識"]
];

export default async function NewReportPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const profile = await requireRole("admin");
  const clients = await getAdminClients();
  const params = await searchParams;

  return (
    <AppShell profile={profile}>
      <div className="mb-6">
        <p className="label">New Report</p>
        <h1 className="mt-1 text-3xl font-black text-joynity-900">レポート作成・編集</h1>
        <p className="mt-2 text-sm text-slate-600">MVPでは入力UIを用意しています。Supabase接続後、保存処理を追加して運用できます。</p>
      </div>

      {params.message ? <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700">{params.message}</p> : null}
      <form action={createReportAction} className="card grid gap-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-bold text-slate-700 md:col-span-2">
            レポートタイトル
            <input className="input" name="title" placeholder="2026年5月 Growth Check レポート" />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            クライアント
            <select className="input" name="client_id">
              {clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            評価日
            <input className="input" type="date" name="evaluation_date" defaultValue={new Date().toISOString().slice(0, 10)} />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            身長
            <input className="input" name="height" placeholder="151.2" />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            体重
            <input className="input" name="weight" placeholder="41.6" />
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            リスクレベル
            <select className="input" name="risk_level">
              <option>土台良好</option>
              <option>要チェック</option>
              <option>個別サポート推奨</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            公開設定
            <select className="input" name="is_published">
              <option value="false">非公開</option>
              <option value="true">公開</option>
            </select>
          </label>
        </div>

        {fields.map(([name, label]) => (
          <label key={name} className="grid gap-1 text-sm font-bold text-slate-700">
            {label}
            <textarea className="input min-h-28" name={name} placeholder={`${label}を入力`} />
          </label>
        ))}

        <button type="submit" className="btn-primary w-fit">保存する</button>
      </form>
    </AppShell>
  );
}
