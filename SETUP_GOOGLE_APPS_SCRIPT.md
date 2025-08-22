# Google Apps Script セットアップガイド

## 🎯 なぜGoogle Apps Scriptが必要か？

Google FormsはセキュリティのためCORS（Cross-Origin Resource Sharing）ポリシーにより、外部のウェブサイトから直接フォームを送信することをブロックしています。

Google Apps Scriptを使うことで、Googleの内部サービスとして動作し、この制限を回避できます。

## 📝 セットアップ手順

### 1. Google Apps Scriptプロジェクトを作成

1. [Google Apps Script](https://script.google.com/home)にアクセス
2. Googleアカウントでログイン
3. 「新しいプロジェクト」をクリック

### 2. コードを設定

1. デフォルトのコードを全て削除
2. `google-apps-script.gs`の内容を全てコピー＆ペースト
3. ファイル → 保存（プロジェクト名: `Design Guild Form Handler`）

### 3. ウェブアプリとしてデプロイ

1. 右上の「デプロイ」→「新しいデプロイ」をクリック
2. 設定：
   - **種類**: 「ウェブアプリ」を選択
   - **説明**: 「Design Guild Form Handler v1」
   - **実行ユーザー**: 「自分」
   - **アクセスできるユーザー**: 「全員」
3. 「デプロイ」をクリック
4. 権限の承認画面が出たら承認

### 4. デプロイURLを取得

デプロイ完了後、以下のようなURLが表示されます：
```
https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxx/exec
```

このURLをコピーしてください。

### 5. main.jsを更新

1. `/js/main.js`を開く
2. 以下の部分を見つけて更新：

```javascript
// 現在のコード（動作しない）
const FORM_URL = `https://docs.google.com/forms/u/0/d/e/${FORM_ID}/formResponse`;

// 以下に変更
const GAS_URL = 'ここにコピーしたURLを貼り付け';
const FORM_URL = GAS_URL;
```

### 6. テスト

1. ブラウザで直接GAS URLにアクセス
   - `{"result":"success","message":"Google Apps Script is working!"}`が表示されればOK
   
2. ウェブサイトからフォーム送信をテスト
3. Google Formsの回答タブで確認

## 🔧 トラブルシューティング

### 権限エラーが出る場合
1. Google Apps Scriptの画面で「デプロイを管理」
2. 「編集」→ アクセス権限を再確認

### 送信されない場合
1. Google Apps ScriptのログをチェックCheck
   - 実行数 → ログを確認
2. CORSエラーが出ていないか確認

## 📌 重要な注意点

- Google Apps ScriptのURLは**絶対に公開リポジトリにコミットしない**
- 環境変数または設定ファイルで管理することを推奨
- 定期的にアクセスログを確認

## 🚀 代替案

もしGoogle Apps Scriptが使えない場合：

1. **Formspree**: https://formspree.io/
2. **Netlify Forms**: Netlifyでホスティングしている場合
3. **EmailJS**: メール送信サービス
4. **自前のバックエンドサーバー**: Node.js等で構築