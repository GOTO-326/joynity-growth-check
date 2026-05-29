import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 border-b border-joynity-100 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-joynity-700">Joynity Growth Check</p>
            <h1 className="text-lg font-black text-joynity-900">成長期サポート評価プロトタイプ</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="btn-secondary" href="/growth-check/index.html" target="_blank" rel="noopener">
              全画面で開く
            </a>
            <Link className="btn-primary" href="/login">
              ログイン版へ
            </Link>
          </div>
        </div>
      </div>
      <iframe
        title="Joynity Growth Check"
        src="/growth-check/index.html"
        className="h-[calc(100vh-73px)] w-full border-0"
      />
    </main>
  );
}
