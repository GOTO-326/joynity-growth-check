import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <main className="page-shell flex min-h-screen items-center justify-center px-5 py-10">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="label mb-2">Joynity Growth Check</p>
          <h1 className="text-3xl font-black text-joynity-900">Joynity Growth Check</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            成長と身体機能を見える化するレポートシステム
          </p>
        </div>
        <div className="card p-7">
          <h2 className="text-xl font-black text-joynity-900">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          <div className="mt-6">{children}</div>
          {footer ? <div className="mt-6 border-t border-slate-100 pt-5 text-sm">{footer}</div> : null}
        </div>
        <p className="mt-5 text-center text-xs text-slate-500">
          Demo admin: admin@joynity.local / Demo client: client@joynity.local
        </p>
      </section>
    </main>
  );
}

export function AuthLinks() {
  return (
    <div className="flex flex-wrap justify-between gap-3 text-joynity-700">
      <Link href="/register" className="font-bold hover:underline">
        クライアント新規登録
      </Link>
      <Link href="/forgot-password" className="font-bold hover:underline">
        パスワード再設定
      </Link>
    </div>
  );
}
