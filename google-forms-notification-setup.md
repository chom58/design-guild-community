# Google Forms 通知設定ガイド

## 📧 申込み通知を受け取る設定

### ステップ1: Google Formsで通知設定
1. [Google Forms](https://forms.google.com) を開く
2. Design Guildのフォームを選択
3. 「回答」タブをクリック
4. 右上の「⋮」メニュー → 「新しい回答についてメール通知を受け取る」を有効化

### ステップ2: 自動返信メールの設定
1. 「設定」⚙️ アイコンをクリック
2. 「プレゼンテーション」タブ
3. 「確認メッセージ」に以下を設定：
```
お申込みありがとうございます！
Design Guildへの参加申込みを受け付けました。
内容を確認の上、ご連絡させていただきます。
```

### ステップ3: 回答者への自動返信
1. 「設定」→「回答」
2. 「メールアドレスを収集する」を有効化
3. 「回答のコピーを回答者に送信」→「常に表示」

## 📊 Google スプレッドシートで管理

### データの確認方法
1. フォームの「回答」タブ
2. スプレッドシートアイコン（緑色）をクリック
3. 新規または既存のスプレッドシートを選択

### スプレッドシートでできること
- 申込み者リストの管理
- フィルターや並び替え
- グラフで統計表示
- CSVエクスポート

## 🔔 Slack/Discord通知（オプション）

### Google Apps Scriptで自動通知
```javascript
function onFormSubmit(e) {
  const response = e.response;
  const items = response.getItemResponses();
  
  let message = "🎉 新規申込みがありました！\n";
  items.forEach(item => {
    message += `${item.getItem().getTitle()}: ${item.getResponse()}\n`;
  });
  
  // Slackに送信
  const webhookUrl = "YOUR_SLACK_WEBHOOK_URL";
  UrlFetchApp.fetch(webhookUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({text: message})
  });
}
```

## ⚠️ エラー「meta is not defined」について

このエラーは通常：
- ブラウザ拡張機能の影響
- デベロッパーツールのコンソールで何か実行した
- 送信は成功しているので無視して大丈夫

## ✅ 確認チェックリスト

- [ ] Google Formsの「回答」タブにデータが表示される
- [ ] スプレッドシートに記録される
- [ ] メール通知が届く（設定した場合）
- [ ] 申込み者に確認メールが届く（設定した場合）

## 📍 データの場所

1. **Google Forms管理画面**
   - https://forms.google.com
   - 該当フォーム → 回答タブ

2. **Google スプレッドシート**
   - Googleドライブに自動保存
   - フォーム名と同じファイル名

3. **メール**
   - Googleアカウントのメールアドレス
   - 通知設定したアドレス