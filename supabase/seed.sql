-- Demo data helper.
-- 1. Create Auth users in Supabase Dashboard:
--    admin@joynity.local / password123
--    staff@joynity.local / password123
--    client@joynity.local / password123
-- 2. Replace the subqueries below if your auth user emails differ.

insert into public.profiles (user_id, role, name, email, team)
select id, 'admin', 'Joynity Admin', email, 'Joynity Conditioning Studio'
from auth.users
where email = 'admin@joynity.local'
on conflict (user_id) do update set role = excluded.role, name = excluded.name;

-- Shared staff admin account.
-- 関係スタッフで共有する場合は、このユーザーのパスワードを施設側で管理してください。
-- 退職・異動時はSupabase Authenticationで必ずパスワードを変更してください。
insert into public.profiles (user_id, role, name, email, team)
select id, 'admin', 'Joynity Staff Shared', email, 'Joynity Conditioning Studio'
from auth.users
where email = 'staff@joynity.local'
on conflict (user_id) do update set role = excluded.role, name = excluded.name;

insert into public.profiles (user_id, role, name, email, birthdate, gender, team, parent_name)
select id, 'client', 'A.K', email, '2012-04-10', '男児', 'Joynity FC', '保護者 Demo'
from auth.users
where email = 'client@joynity.local'
on conflict (user_id) do update set role = excluded.role, name = excluded.name;

insert into public.clients (profile_id, name, birthdate, gender, height, weight, sport, team, notes)
select p.id, 'A.K', '2012-04-10', '男児', 151.2, 41.6, 'サッカー', 'Joynity FC', '成長期の膝・踵の痛み予防を目的に定期チェック中。'
from public.profiles p
where p.email = 'client@joynity.local'
on conflict do nothing;

insert into public.reports (
  client_id,
  title,
  evaluation_date,
  height,
  weight,
  growth_stage,
  echo_findings,
  posture_findings,
  movement_findings,
  risk_level,
  summary,
  advice,
  exercise_menu,
  is_published
)
select
  c.id,
  '2026年5月 Growth Check レポート',
  '2026-05-13',
  151.2,
  41.6,
  '成長ピーク前',
  '骨端線は開存しており、今後の身長変化に合わせて膝・踵の負担を確認したい時期です。',
  '軽度の反り腰傾向。片脚支持で骨盤が落ちやすい。',
  '片脚スクワットとジャンプ着地で軽度の左右差あり。',
  '要チェック',
  '大きな問題は少ない一方で、成長ピークに向けて着地・片脚支持・補食を整えたい状態です。',
  '練習後30分以内におにぎりや牛乳を追加し、睡眠時間を7.5〜8時間以上に近づけましょう。',
  '足首モビリティ 3分 / 片脚支持トレーニング 5分 / 着地フォーム確認',
  true
from public.clients c
where c.name = 'A.K'
on conflict do nothing;
