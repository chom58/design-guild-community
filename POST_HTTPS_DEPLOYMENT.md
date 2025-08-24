# HTTPS有効化後のデプロイメント手順

## ✅ 完了したセキュリティ設定

HTTPSが正常に有効化されました！以下のセキュリティ強化が完了しています：

### 1. SSL/TLS証明書
- ✅ 無料SSL証明書の設定完了
- ✅ https://design-guild.org/ でのアクセス確認済み

### 2. セキュリティ対策ファイル作成済み
- `.htaccess-production` - 本番環境用の完全なセキュリティ設定
- `SECURITY_CHECK.md` - セキュリティチェック手順書
- `email-protection.js` - メールアドレススパム対策
- `email-protection.css` - メール保護UI用スタイル

## 🚀 次のステップ：セキュリティ強化のデプロイ

### 1. .htaccessの更新

Xserverファイルマネージャーで以下を実行：

1. `/public_html/.htaccess-production` をアップロード
2. 既存の `.htaccess` をバックアップ（`.htaccess.backup` にリネーム）
3. `.htaccess-production` を `.htaccess` にリネーム
4. パーミッションを644に設定

### 2. メールアドレス保護機能の追加

以下のファイルをアップロード：
- `js/email-protection.js`
- `css/email-protection.css`

更新済みファイル：
- `index.html` （メールアドレス表示部分を動的生成に変更）

### 3. セキュリティチェック

以下のツールでサイトをスキャン：

#### SSL Labs
https://www.ssllabs.com/ssltest/analyze.html?d=design-guild.org

目標: A評価以上

#### Security Headers
https://securityheaders.com/?q=design-guild.org

目標: A評価以上

#### Mozilla Observatory
https://observatory.mozilla.org/analyze/design-guild.org

目標: B+評価以上

## 📋 デプロイメントチェックリスト

### 必須項目
- [ ] .htaccess-productionをサーバーにアップロード
- [ ] .htaccessにリネーム
- [ ] email-protection.jsをアップロード
- [ ] email-protection.cssをアップロード
- [ ] 更新版index.htmlをアップロード

### 確認項目
- [ ] HTTPからHTTPSへのリダイレクト動作
- [ ] メールアドレスが動的に表示される
- [ ] コピーボタンが機能する
- [ ] すべてのリソースがHTTPS経由で読み込まれる
- [ ] Mixed Content警告がない

### セキュリティスキャン
- [ ] SSL Labs: A評価以上
- [ ] Security Headers: A評価以上
- [ ] Mozilla Observatory: B+評価以上

## 🔍 トラブルシューティング

### リダイレクトループが発生した場合
1. .htaccessのRewriteRuleを確認
2. Xserverの管理画面でSSL設定を確認
3. CloudflareなどCDNを使用している場合は設定確認

### メールアドレスが表示されない場合
1. JavaScriptコンソールでエラー確認
2. email-protection.jsが正しく読み込まれているか確認
3. ブラウザのキャッシュをクリア

### セキュリティヘッダーが反映されない場合
1. .htaccessの構文エラーをチェック
2. mod_headersモジュールが有効か確認
3. Xserverサポートに問い合わせ

## 📞 サポート連絡先

### Xserverサポート
- メール: support@xserver.ne.jp
- 電話: 06-6147-2580（平日10:00-18:00）

### 技術的な質問
セキュリティ設定について不明な点があれば、以下の情報と共にサポートに連絡：
- サーバーID
- ドメイン名: design-guild.org
- 発生している問題の詳細
- エラーメッセージ（あれば）

## 🎉 おめでとうございます！

Design Guildのウェブサイトが安全にHTTPS化されました。定期的なセキュリティチェックを実施し、安全な運用を継続してください。