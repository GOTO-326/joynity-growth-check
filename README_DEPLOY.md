# Joynity Growth Check 公開手順

このフォルダは、そのまま静的Webアプリとして公開できます。サーバー処理、データベース、外部API、localStorageは使っていません。

## 公開するファイル構成

```text
joynity-conditioning-studio-web-joynity-growth/
├── index.html
├── style.css
├── script.js
├── netlify.toml
├── vercel.json
└── README_DEPLOY.md
```

## いちばん簡単な方法 Netlify Drop

1. ブラウザで Netlify にログインします。
2. `https://app.netlify.com/drop` を開きます。
3. このフォルダごとドラッグ&ドロップします。
4. 数十秒後に `https://xxxx.netlify.app` のようなURLが発行されます。
5. そのURLをスタッフへ共有すれば、スマホやPCから入力できます。

Netlify公式ドキュメントでも、HTML/CSS/JSなどを含むプロジェクトフォルダをドラッグ&ドロップして公開できる案内があります。

## Vercelで公開する場合

1. GitHubの `GOTO-326/joynity-growth-check` にこのフォルダをアップロードします。
2. Vercel にログインします。
3. Add New → Project を押します。
4. `GOTO-326/joynity-growth-check` を選びます。
5. Project Name は `joynity-growth-check` にします。
6. Framework Preset は `Next.js` にします。
7. Environment Variables に必要なSupabase情報を入れます。
8. Deploy を押すと `https://joynity-growth-check.vercel.app` のようなURLが発行されます。

詳しい手順は `README.md` を確認してください。

## 運用上の注意

- 保護者メールアドレスと生年月日はCSVに保存されません。
- CSVには選手ID、年齢、学年、評価結果のみを保存します。
- 公開URLを知っている人は誰でも画面を開けます。入力内容はクラウド保存されませんが、スタッフ運用ではURL共有先を必要な範囲に絞ってください。
- レポート送信は自動送信ではありません。画面で作成したメール本文をスタッフが確認し、通常のメールアプリから送信してください。
