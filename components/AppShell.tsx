import Link from "next/link";
import { Activity, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import type { Profile } from "@/lib/types";
import { signOutAction } from "@/app/auth/actions";

type AppShellProps = {
  profile: Profile;
  children: ReactNode;
};

export function AppShell({ profile, children }: AppShellProps) {
  const homeHref = profile.role === "admin" ? "/admin/dashboard" : "/client/dashboard";
  return (
    <div className="page-shell min-h-screen">
      <header className="border-b border-joynity-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link href={homeHref} className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-joynity-500 text-white">
              <Activity size={22} />
            </span>
            <span>
              <strong className="block text-lg font-black text-joynity-900">Joynity Growth Check</strong>
              <span className="text-xs text-slate-500">成長と身体機能を見える化するレポートシステム</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-joynity-900">{profile.name}</p>
              <p className="text-xs text-slate-500">{profile.role}</p>
            </div>
            <form action={signOutAction}>
              <button className="btn-secondary gap-2" type="submit">
                <LogOut size={16} />
                ログアウト
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
