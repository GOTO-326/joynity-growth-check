import type { ClientWithReports, Profile, Report } from "@/lib/types";

export const demoAdminProfile: Profile = {
  id: "demo-admin-profile",
  user_id: "demo-admin-user",
  role: "admin",
  name: "Joynity Admin",
  email: "admin@joynity.local",
  birthdate: null,
  gender: null,
  team: "Joynity Conditioning Studio",
  parent_name: null,
  phone: null,
  created_at: new Date().toISOString()
};

export const demoClientProfile: Profile = {
  id: "demo-client-profile",
  user_id: "demo-client-user",
  role: "client",
  name: "Demo Client",
  email: "client@joynity.local",
  birthdate: "2012-04-10",
  gender: "男児",
  team: "Joynity FC",
  parent_name: "保護者 Demo",
  phone: "000-0000-0000",
  created_at: new Date().toISOString()
};

export const demoReports: Report[] = [
  {
    id: "demo-report-1",
    client_id: "demo-client-1",
    title: "2026年5月 Growth Check レポート",
    evaluation_date: "2026-05-13",
    height: 151.2,
    weight: 41.6,
    growth_stage: "成長ピーク前",
    echo_findings: "骨端線は開存しており、今後の身長変化に合わせて膝・踵の負担を確認したい時期です。",
    posture_findings: "軽度の反り腰傾向。片脚支持で骨盤が落ちやすい。",
    movement_findings: "片脚スクワットとジャンプ着地で軽度の左右差あり。",
    risk_level: "要チェック",
    summary: "大きな問題は少ない一方で、成長ピークに向けて着地・片脚支持・補食を整えたい状態です。",
    advice: "練習後30分以内におにぎりや牛乳を追加し、睡眠時間を7.5〜8時間以上に近づけましょう。",
    exercise_menu: "足首モビリティ 3分 / 片脚支持トレーニング 5分 / 着地フォーム確認",
    pdf_url: "",
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "demo-report-2",
    client_id: "demo-client-1",
    title: "2026年2月 Growth Check レポート",
    evaluation_date: "2026-02-10",
    height: 148.5,
    weight: 39.8,
    growth_stage: "成長加速期",
    echo_findings: "成長ピーク前の準備期として経過確認を推奨。",
    posture_findings: "姿勢左右差は軽度。",
    movement_findings: "足関節可動性にやや制限。",
    risk_level: "土台良好",
    summary: "全体として安定。身長変化に合わせた継続チェックが重要です。",
    advice: "朝食と補食を継続し、練習後の回復を整えましょう。",
    exercise_menu: "足首モビリティ / 股関節ストレッチ",
    pdf_url: "",
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const demoClients: ClientWithReports[] = [
  {
    id: "demo-client-1",
    profile_id: demoClientProfile.id,
    name: "A.K",
    birthdate: "2012-04-10",
    gender: "男児",
    height: 151.2,
    weight: 41.6,
    sport: "サッカー",
    team: "Joynity FC",
    notes: "成長期の膝・踵の痛み予防を目的に定期チェック中。",
    created_at: new Date().toISOString(),
    reports: demoReports
  },
  {
    id: "demo-client-2",
    profile_id: null,
    name: "M.S",
    birthdate: "2011-09-20",
    gender: "女児",
    height: 156.8,
    weight: 45.4,
    sport: "バスケットボール",
    team: "Joynity Academy",
    notes: "ジャンプ着地と補食習慣を確認中。",
    created_at: new Date().toISOString(),
    reports: []
  }
];

