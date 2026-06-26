# デプロイメントチェックリスト

## 📤 アップロード必須ファイル

### JavaScript（優先度：高）
- [ ] `js/smooth-scroll.js` - ナビゲーション修正
- [ ] `js/mobile-menu.js` - モバイルメニュー改善
- [ ] `js/lazy-load.js` - パフォーマンス向上
- [ ] `js/touch-optimize.js` - タッチ操作改善
- [ ] `js/email-protection.js` - メールアドレス保護

### CSS（優先度：高）
- [ ] `css/mobile-navigation.css` - モバイルナビ
- [ ] `css/mobile-responsive.css` - レスポンシブ対応
- [ ] `css/new-sections.css` - 新セクション
- [ ] `css/button-fix.css` - ボタン修正
- [ ] `css/email-protection.css` - メール保護

### HTML（優先度：最高）
- [ ] `index.html` - 更新版（新セクション統合）
- [ ] `events-simple.html` - イベントページ

### 画像（優先度：中）
- [ ] OGP画像作成（1200x630px）
- [ ] `images/ogp-image.png`として保存

## 🔧 index.html編集内容

### 1. CSS追加（</head>前）
```html
<link rel="stylesheet" href="css/mobile-navigation.css">
<link rel="stylesheet" href="css/mobile-responsive.css">  
<link rel="stylesheet" href="css/new-sections.css">
```

### 2. 新セクション追加（CTAセクション前）
`new-sections-integrated.html`の内容を挿入

### 3. JavaScript追加（</body>前）
```html
<script src="js/smooth-scroll.js"></script>
<script src="js/mobile-menu.js"></script>
<script src="js/lazy-load.js"></script>
<script src="js/touch-optimize.js"></script>
```

## ✅ テスト項目

### デスクトップ
- [ ] ナビゲーションのスムーススクロール動作
- [ ] 参加者の声セクション表示
- [ ] FAQアコーディオン動作
- [ ] 参加ステップ表示

### モバイル（320px）
- [ ] ハンバーガーメニュー動作
- [ ] タップ操作の反応
- [ ] 文字サイズ適切
- [ ] ボタンタップ可能

### タブレット（768px）
- [ ] レイアウト崩れなし
- [ ] グリッド表示適切
- [ ] ナビゲーション表示

## 🚨 重要確認事項

1. **ボタンの文字色**
   - 参加するボタンの文字が見える
   - ホバー時の色変化確認

2. **モバイルメニュー**
   - 開閉がスムーズ
   - オーバーレイ表示
   - リンククリックで閉じる

3. **スクロール**
   - アンカーリンクが正常動作
   - ヘッダー高さ考慮

4. **パフォーマンス**
   - 初回表示3秒以内
   - スクロールスムーズ

## 📱 ブラウザ確認

- [ ] Chrome（最新）
- [ ] Safari（iOS）
- [ ] Edge
- [ ] Firefox

## 🎯 最終確認

- [ ] HTTPSで正常表示
- [ ] Mixed Contentエラーなし
- [ ] JavaScriptエラーなし
- [ ] 404リンクなし

---

すべてチェック完了後、本番環境へデプロイしてください！