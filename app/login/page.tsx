import { AuthCard, AuthLinks } from "@/components/AuthCard";
import { signInAction } from "@/app/auth/actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;
  return (
    <AuthCard
      title="ログイン"
      description="管理者またはクライアントとしてログインします。Supabase未設定時はデモ画面へ進みます。"
      footer={<AuthLinks />}
    >
      {params.message ? (
        <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700">{params.message}</p>
      ) : null}
      <div className="mb-5 rounded-lg border border-joynity-100 bg-joynity-50 px-4 py-3 text-sm leading-6 text-joynity-900">
        <p className="font-black">スタッフ共有ログイン</p>
        <p>関係スタッフは、施設で管理している共通の管理者メールアドレスとパスワードでログインできます。</p>
        <p className="mt-1 text-xs text-slate-600">退職・異動時は必ず管理者パスワードを変更してください。</p>
      </div>
      <form action={signInAction} className="grid gap-4">
        <label className="grid gap-1 text-sm font-bold text-slate-700">
          ロール
          <select name="role" className="input">
            <option value="admin">管理者</option>
            <option value="client">クライアント</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-bold text-slate-700">
          メールアドレス
          <input name="email" type="email" className="input" defaultValue="admin@joynity.local" required />
        </label>
        <label className="grid gap-1 text-sm font-bold text-slate-700">
          パスワード
          <input name="password" type="password" className="input" defaultValue="password123" required />
        </label>
        <button className="btn-primary" type="submit">
          ログイン
        </button>
      </form>
    </AuthCard>
  );
}
