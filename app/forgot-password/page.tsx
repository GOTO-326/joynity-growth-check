import Link from "next/link";
import { AuthCard } from "@/components/AuthCard";
import { resetPasswordAction } from "@/app/auth/actions";

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;
  return (
    <AuthCard
      title="パスワード再設定"
      description="登録メールアドレスへ再設定リンクを送信します。"
      footer={<Link href="/login" className="font-bold text-joynity-700 hover:underline">ログインへ戻る</Link>}
    >
      {params.message ? <p className="mb-4 rounded-lg bg-joynity-50 px-3 py-2 text-sm font-bold text-joynity-700">{params.message}</p> : null}
      <form action={resetPasswordAction} className="grid gap-4">
        <label className="grid gap-1 text-sm font-bold text-slate-700">
          メールアドレス
          <input name="email" type="email" className="input" required />
        </label>
        <button className="btn-primary" type="submit">再設定メールを送信</button>
      </form>
    </AuthCard>
  );
}

