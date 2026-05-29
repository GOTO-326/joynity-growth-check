import Link from "next/link";
import { CalendarDays, Plus, Users } from "lucide-react";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { getAdminClients } from "@/lib/data";
import { requireRole } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const profile = await requireRole("admin");
  const clients = await getAdminClients();

  return (
    <AppShell profile={profile}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="label">Admin Dashboard</p>
          <h1 className="mt-1 text-3xl font-black text-joynity-900">登録クライアント一覧</h1>
          <p className="mt-2 text-sm text-slate-600">管理者は全クライアントと全レポートを閲覧・編集できます。</p>
        </div>
        <Link href="/admin/reports/new" className="btn-primary gap-2">
          <Plus size={18} />
          新規レポート作成
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="登録クライアント" value={`${clients.length}名`} icon={<Users size={20} />} />
        <StatCard label="公開レポート" value={`${clients.flatMap((c) => c.reports || []).filter((r) => r.is_published).length}件`} icon={<CalendarDays size={20} />} />
        <StatCard label="要確認" value={`${clients.filter((c) => (c.reports || [])[0]?.risk_level === "要チェック").length}名`} icon={<Users size={20} />} />
      </section>

      <section className="card mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-joynity-50 text-joynity-900">
              <tr>
                <th className="px-4 py-3">名前</th>
                <th className="px-4 py-3">年齢</th>
                <th className="px-4 py-3">所属</th>
                <th className="px-4 py-3">競技</th>
                <th className="px-4 py-3">最終評価日</th>
                <th className="px-4 py-3">ステータス</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => {
                const latest = [...(client.reports || [])].sort((a, b) => b.evaluation_date.localeCompare(a.evaluation_date))[0];
                const age = client.birthdate ? new Date().getFullYear() - new Date(client.birthdate).getFullYear() : "-";
                return (
                  <tr key={client.id} className="bg-white">
                    <td className="px-4 py-4 font-bold text-joynity-900">{client.name}</td>
                    <td className="px-4 py-4">{age}</td>
                    <td className="px-4 py-4">{client.team || "-"}</td>
                    <td className="px-4 py-4">{client.sport || "-"}</td>
                    <td className="px-4 py-4">{latest?.evaluation_date || "未評価"}</td>
                    <td className="px-4 py-4"><StatusBadge value={latest?.is_published ?? false} /></td>
                    <td className="px-4 py-4">
                      <Link href={`/admin/clients/${client.id}`} className="font-bold text-joynity-700 hover:underline">
                        詳細を見る
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center gap-2 text-joynity-700">{icon}<span className="label">{label}</span></div>
      <strong className="text-2xl font-black text-joynity-900">{value}</strong>
    </div>
  );
}
