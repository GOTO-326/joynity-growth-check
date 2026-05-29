# Joynity Growth Check

成長期の身体評価・エコー評価・コンディショニング提案を見える化するJoynity専用アプリです。  
現在の静的プロトタイプをトップページで表示しつつ、Next.js / TypeScript / Tailwind CSS / Supabase / Vercel を前提にしたログイン版MVPも同じプロジェクト内に用意しています。

## 重要: 専用Vercelプロジェクトとして公開する

このアプリは、他者が作成した `growth-echo-app` には接続しません。  
Vercelでは必ず新しいプロジェクトとして作成し、プロジェクト名は以下を第一候補にしてください。

```text
joynity-growth-check
```

想定する公開URL:

```text
https://joynity-growth-check.vercel.app
```

このURLを開くと、現在の Joynity Growth Check 画面が表示されます。

## 画面

- `/` Joynity Growth Check 現行プロトタイプ
- `/growth-check/index.html` 現行プロトタイプを全画面表示
- `/login` 管理者・クライアントログイン
- `/register` クライアント新規登録
- `/forgot-password` パスワード再設定
- `/admin/dashboard` 管理者ダッシュボード
- `/admin/clients/[id]` クライアント詳細・レポート管理
- `/admin/reports/new` レポート作成フォーム
- `/client/dashboard` クライアントの自分専用レポート一覧
- `/client/reports/[id]` 個別レポート閲覧

## プロジェクト構成

```text
app/                  Next.js App Router
components/           共通UI
lib/                  Supabase接続、認証、データ取得、型定義
public/growth-check/  現在のJoynity Growth Check静的アプリ
supabase/schema.sql   Database / RLS / Storage policy
supabase/seed.sql     デモデータ投入SQL
```

## ローカル起動

1. Node.jsをインストールします。
2. このフォルダで依存関係をインストールします。

```bash
npm install
```

3. `.env.local.example` をコピーして `.env.local` を作成します。

```bash
cp .env.local.example .env.local
```

4. `.env.local` にSupabase情報を入れます。

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. 起動します。

```bash
npm run dev
```

6. ブラウザで開きます。

```text
http://localhost:3000/
```

Supabase環境変数が未設定の場合は、ダミーデータで画面確認できます。

## 環境変数

ローカルは `.env.local`、Vercelは Project Settings → Environment Variables に設定します。

| Key | 値の例 | 用途 |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Supabase anon public key |
| `NEXT_PUBLIC_APP_URL` | `https://joynity-growth-check.vercel.app` | パスワード再設定などの戻り先URL |

注意:

- `service_role_key` は絶対にフロント側・Vercel環境変数に設定しないでください。
- このMVPは `NEXT_PUBLIC_SUPABASE_ANON_KEY` のみをブラウザ側で使用します。
- RLSで権限を制御するため、`supabase/schema.sql` を必ず実行してください。

## Supabase設定

1. Supabaseで新規プロジェクトを作成
2. Project Settings → API で以下を確認
   - Project URL
   - anon public key
3. Authentication → Providers → Email を有効化
4. SQL Editorで `supabase/schema.sql` を実行
5. Authentication → Users でテストユーザーを作成
   - `admin@joynity.local / password123`
   - `staff@joynity.local / password123`
   - `client@joynity.local / password123`
6. SQL Editorで `supabase/seed.sql` を実行
7. Storageに `report-pdfs` bucket が作成されていることを確認

## Supabase Auth URL設定

Vercel公開URLが以下の場合:

```text
https://joynity-growth-check.vercel.app
```

Supabase Dashboard → Authentication → URL Configuration で設定します。

### Site URL

```text
https://joynity-growth-check.vercel.app
```

### Redirect URLs

```text
https://joynity-growth-check.vercel.app/auth/callback
https://joynity-growth-check.vercel.app/login
http://localhost:3000/auth/callback
http://localhost:3000/login
```

本番URLが変わった場合は、`joynity-growth-check.vercel.app` の部分を実際のVercel URLに置き換えてください。

## RLS権限

`supabase/schema.sql` で以下を設定しています。

- adminは全クライアント・全レポートを閲覧/編集可能
- clientは自分の `profile_id` に紐づくクライアント情報のみ閲覧可能
- clientは公開済みレポートのみ閲覧可能
- clientは他人の情報を閲覧不可
- PDF Storageはadminが管理、clientは閲覧のみ

## スタッフ共有ログイン

関係スタッフが同じ管理者画面を使う場合は、Supabase Authenticationで共有用の管理者ユーザーを1つ作成してください。

```text
メール: staff@joynity.local
パスワード: 施設内で決めた強いパスワード
ロール: admin
```

作成後、`supabase/seed.sql` を実行すると `profiles.role = admin` として登録されます。  
この共有アカウントでログインしたスタッフは、管理者と同じく全クライアント・全レポートを閲覧/編集できます。

運用ルール:

- パスワードは関係スタッフ以外に共有しない
- 退職・異動・担当外になったスタッフが出たら、Supabase Authenticationでパスワードを変更する
- 可能であれば将来的にはスタッフごとにadminアカウントを発行する
- クライアントには共有管理者パスワードを伝えない

## GitHubへpushする手順

新しくGitHubリポジトリを作る場合は、リポジトリ名も `joynity-growth-check` を推奨します。  
既存の `growth-echo-app` リポジトリやVercelプロジェクトには紐づけないでください。

今回使うGitHub Repository:

```text
https://github.com/GOTO-326/joynity-growth-check
```

初回だけ、このフォルダで以下を実行します。

```bash
git init
git add .
git commit -m "Initial Joynity Growth Check app"
git branch -M main
git remote add origin https://github.com/GOTO-326/joynity-growth-check.git
git push -u origin main
```

すでにGitHubリポジトリがある場合:

```bash
git add .
git commit -m "Prepare Vercel deployment"
git push
```

## Vercel公開手順

1. [Vercel](https://vercel.com/) にログイン
2. Add New → Project
3. GitHubから `GOTO-326/joynity-growth-check` を選択
4. 既存の `growth-echo-app` プロジェクトは選択しない
5. Project Name に `joynity-growth-check` と入力
6. Framework Preset が `Next.js` になっていることを確認
7. Root Directory がこのプロジェクトのルートになっていることを確認
8. Environment Variables に以下を追加
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`
9. `NEXT_PUBLIC_APP_URL` にはVercelで使うURLを入れます。

例:

```text
https://joynity-growth-check.vercel.app
```

10. Deploy を押します。
11. デプロイ完了後、発行されたURLをSupabaseのSite URL / Redirect URLsにも設定します。

### VercelでNew ProjectとしてImportする時の確認

- [ ] GitHubリポジトリは `GOTO-326/joynity-growth-check`
- [ ] Vercel Project Name は `joynity-growth-check`
- [ ] Framework Preset は `Next.js`
- [ ] Root Directory は空欄またはリポジトリルート
- [ ] 既存の `growth-echo-app` にはImportしない
- [ ] 既存の `growth-echo-app` のEnvironment Variablesを流用しない
- [ ] Deploy後のURLが `https://joynity-growth-check.vercel.app` またはJoynity専用URLになっている

旧手順との混同を防ぐため、別プロジェクトのURLは使用しません。

## Vercel Environment Variables

Vercelの Project Settings → Environment Variables に設定してください。

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_APP_URL=https://joynity-growth-check.vercel.app
```

設定対象は Production / Preview / Development すべてに入れておくと安全です。

## 公開後チェックリスト

公開URLが `https://joynity-growth-check.vercel.app` の場合:

- [ ] `https://joynity-growth-check.vercel.app/` で Joynity Growth Check の現行画面が表示される
- [ ] `https://joynity-growth-check.vercel.app/growth-check/index.html` で現行画面を全画面表示できる
- [ ] スマホ幅でトップ画面と入力フォームが見やすい
- [ ] `https://joynity-growth-check.vercel.app/login` が表示される
- [ ] `https://joynity-growth-check.vercel.app/register` が表示される
- [ ] `https://joynity-growth-check.vercel.app/forgot-password` が表示される
- [ ] 管理者アカウントでログインできる
- [ ] `/admin/dashboard` でクライアント一覧が表示される
- [ ] `/admin/clients/[id]` でクライアント詳細が表示される
- [ ] `/admin/reports/new` でレポート作成フォームが表示される
- [ ] クライアントアカウントでログインできる
- [ ] `/client/dashboard` で公開済みレポートが表示される
- [ ] `/client/reports/[id]` で個別レポートが表示される
- [ ] 非公開レポートがクライアント側に表示されない
- [ ] PDFアップロード後、PDF閲覧リンクが開く
- [ ] パスワード再設定メールのリンク先が `https://joynity-growth-check.vercel.app` になっている

## デプロイ前確認

ローカルで実行できる環境では、以下を確認してください。

```bash
npm install
npm run build
```

このCodex環境では通常の `npm` が見つからないため、ビルド確認は手元のNode.js環境またはVercel上で行ってください。

## 実装メモ

- 現在の Joynity Growth Check 静的アプリは `public/growth-check/` に配置しています。
- トップページ `/` は `app/page.tsx` で静的アプリを表示しています。
- 既存のローカル確認用 `index.html` / `style.css` / `script.js` もルートに残しています。
- レポート文言は `components/ReportView.tsx` で保護者向けに表示しています。
- ダミーデータは `lib/mock-data.ts` で編集できます。
- Supabase取得処理は `lib/data.ts` に集約しています。
- Auth処理は `app/auth/actions.ts` に集約しています。
- 管理者保存処理は `app/admin/actions.ts` に集約しています。
- RLSは `supabase/schema.sql` を更新してください。

## 次に実装するとよいもの

- レポート編集履歴
- 管理者によるclient紐付けUIの強化
- PDFプレビュー
- LINE通知/予約リンクの正式連携
- スタッフごとの個別adminアカウント発行
