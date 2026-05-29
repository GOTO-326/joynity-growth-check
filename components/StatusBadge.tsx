export function StatusBadge({ value }: { value: string | boolean | null | undefined }) {
  const label = typeof value === "boolean" ? (value ? "公開中" : "非公開") : value || "未設定";
  const tone =
    label === "公開中" || label === "土台良好"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : label === "非公開" || label === "要チェック"
        ? "bg-amber-50 text-amber-700 border-amber-100"
        : "bg-rose-50 text-rose-700 border-rose-100";

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${tone}`}>{label}</span>;
}

