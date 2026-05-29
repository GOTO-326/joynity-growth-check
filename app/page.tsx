export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3fbf8] px-6">
      <section className="w-full max-w-2xl rounded-3xl border border-[#cce8df] bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold tracking-[0.2em] text-[#4c9f8c]">Joynity Conditioning Studio</p>
        <h1 className="mt-4 text-4xl font-black text-[#176b5b]">Joynity Growth Check</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          成長期の身体評価とコンディショニング提案を見える化するWebアプリです。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            className="rounded-full bg-[#7ABCA6] px-6 py-3 text-sm font-bold text-white"
            href="/growth-check/index.html"
          >
            Growth Checkを開く
          </a>
          <a
            className="rounded-full border border-[#7ABCA6] px-6 py-3 text-sm font-bold text-[#176b5b]"
            href="/login"
          >
            ログイン画面
          </a>
        </div>
      </section>
    </main>
  );
}
