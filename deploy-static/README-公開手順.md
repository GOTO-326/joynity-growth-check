# Joynity Growth Check 簡単公開手順

このフォルダは、Joynity Growth CheckをWebで簡単に公開するための最小構成です。

## 入っているファイル

- `index.html`
- `style.css`
- `script.js`

この3ファイルだけでブラウザ上で動きます。外部サーバー通信、データベース保存、ログインは使いません。

## 一番簡単な公開方法: Netlify Drop

1. ブラウザで以下を開きます。

```text
https://app.netlify.com/drop
```

2. この `deploy-static` フォルダを画面にドラッグ＆ドロップします。

3. 自動でURLが発行されます。

例:

```text
https://xxxxxx.netlify.app
```

4. 発行されたURLをスタッフに送れば、スマホやPCからアクセスできます。

## URL名を変更したい場合

Netlifyにログインすると、Site settings からURL名を変更できます。

例:

```text
https://joynity-growth-check.netlify.app
```

すでに同じ名前が使われている場合は、別の名前にしてください。

## 注意

- メールアドレスや生年月日はCSVに保存されません。
- CSVファイルは個人名を入れず、選手IDで管理してください。
- Netlify Drop公開版は、URLを知っている人がアクセスできます。
- 本格運用でログイン管理が必要な場合は、Next.js / Supabase版をVercelで公開してください。

