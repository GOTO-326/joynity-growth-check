import Link from "next/link";
import { AuthCard } from "@/components/AuthCard";
import { registerAction } from "@/app/auth/actions";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;
  return (
    <AuthCard
      title="クライアント新規登録"
      description="保護者・選手用アカウントを作成します。登録後、自分に公開されたレポートだけ閲覧できます。"
      footer={<Link href="/login" className="font-bold text-joynity-700 hover:underline">ログインへ戻る</Link>}
    >
      {params.message ? <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700">{params.message}</p> : null}
      <form action={registerAction} className="grid gap-4">
        <label className="grid gap-1 text-sm font-bold text-slate-700">
          名前
          <input name="name" className="input" placeholder="例 山田 太郎" required />
        </label>
        <label className="grid gap-1 text-sm font-bold text-slate-700">
          メールアドレス
          <input name="email" type="email" className="input" required />
        </label>
        <label className="grid gap-1 text-sm font-bold text-slate-700">
          パスワード
          <input name="password" type="password" minLength={8} className="input" required />
        </label>
        <button className="btn-primary" type="submit">登録する</button>
      </form>
    </AuthCard>
  );
}

