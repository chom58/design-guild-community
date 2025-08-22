# Formspree 設定ガイド（5分で完了）

## Formspreeとは？
無料で使えるフォーム送信サービス。メールで回答を受け取れます。

## セットアップ手順

### 1. アカウント作成（1分）
1. https://formspree.io/ にアクセス
2. 「Get Started」をクリック
3. メールアドレスとパスワードで登録

### 2. フォーム作成（2分）
1. ダッシュボードで「+ New Form」をクリック
2. フォーム名: `Design Guild 参加申し込み`
3. 通知先メール: あなたのメールアドレス

### 3. エンドポイントURL取得（30秒）
作成後、以下のようなURLが表示されます：
```
https://formspree.io/f/xxxxxxxx
```
このURLをコピー

### 4. main.jsを更新（1分）
```javascript
// 変更前
const GAS_URL = 'https://script.google.com/macros/s/...';

// 変更後
const FORMSPREE_URL = 'https://formspree.io/f/xxxxxxxx';
```

### 5. 送信コードを修正（30秒）
```javascript
// Formspree用の送信コード
fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        lineId: formData.get('lineId'),
        profession: formData.get('profession'),
        experience: formData.get('experience'),
        motivation: formData.get('motivation'),
        portfolio: formData.get('portfolio')
    })
})
```

## メリット
- ✅ 確実に動作する
- ✅ メールで即座に通知
- ✅ 管理画面で回答を確認可能
- ✅ CSVエクスポート可能
- ✅ 無料プラン：月50件まで

## デメリット
- ❌ Google Formsではなくなる
- ❌ 月50件以上は有料

---

# 代替案2: EmailJS

## EmailJSとは？
JavaScriptから直接メールを送信できるサービス

## セットアップ手順
1. https://www.emailjs.com/ でアカウント作成
2. メールサービス（Gmail等）を連携
3. テンプレート作成
4. APIキーを取得

---

# 代替案3: Netlify Forms

Netlifyでホスティングする場合のみ使用可能。
HTMLフォームに`netlify`属性を追加するだけで動作。