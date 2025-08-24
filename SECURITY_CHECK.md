# セキュリティチェック手順書

## 🔍 セキュリティ診断ツールでの確認

### 1. SSL Labs - SSL証明書の品質チェック
**URL**: https://www.ssllabs.com/ssltest/

1. サイトURLを入力: `https://design-guild.org`
2. 「Submit」をクリック
3. 結果確認（目標: A評価以上）

**確認ポイント**:
- ✅ Overall Rating: A以上
- ✅ Certificate: 有効期限と発行元
- ✅ Protocol Support: TLS 1.2以上のみ
- ✅ Key Exchange: 強度4096bit推奨
- ✅ Cipher Strength: 256bit推奨

### 2. Security Headers - HTTPヘッダーチェック
**URL**: https://securityheaders.com/

1. サイトURLを入力: `https://design-guild.org`
2. 「Scan」をクリック
3. 結果確認（目標: A評価以上）

**必須ヘッダー**:
- ✅ Strict-Transport-Security (HSTS)
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Referrer-Policy
- ✅ Permissions-Policy

### 3. Mozilla Observatory - 総合セキュリティ診断
**URL**: https://observatory.mozilla.org/

1. サイトURLを入力: `https://design-guild.org`
2. 「Scan Me」をクリック
3. 結果確認（目標: B+以上）

**チェック項目**:
- ✅ Content Security Policy
- ✅ Cookies (Secure flag)
- ✅ Cross-origin Resource Sharing
- ✅ HTTP Strict Transport Security
- ✅ Redirection

## 🛡️ 手動セキュリティチェック

### ブラウザでの確認

#### Chrome DevTools
1. F12でDevToolsを開く
2. Securityタブを確認
   - ✅ 「This page is secure (valid HTTPS)」表示
   - ✅ 証明書の詳細確認

3. Networkタブで確認
   - ✅ すべてのリソースがHTTPS経由
   - ✅ Mixed Contentの警告なし

4. ConsoleタブでエラーCheck
   - ✅ セキュリティ関連のエラーなし

### HTTPSリダイレクトテスト

```bash
# HTTPアクセスでHTTPSにリダイレクトされるか確認
curl -I http://design-guild.org

# 期待される結果:
# HTTP/1.1 301 Moved Permanently
# Location: https://design-guild.org/
```

### セキュリティヘッダーの確認

```bash
# セキュリティヘッダーを確認
curl -I https://design-guild.org

# 確認すべきヘッダー:
# Strict-Transport-Security
# X-Frame-Options
# X-Content-Type-Options
# X-XSS-Protection
# Referrer-Policy
```

## 📋 セキュリティチェックリスト

### 基本項目
- [ ] HTTPSが有効（緑の鍵アイコン表示）
- [ ] HTTPからHTTPSへ自動リダイレクト
- [ ] www付き/なしの統一
- [ ] SSL証明書の有効期限確認（3ヶ月以上）

### セキュリティヘッダー
- [ ] HSTS（Strict-Transport-Security）設定済み
- [ ] X-Frame-Options設定済み
- [ ] X-Content-Type-Options設定済み
- [ ] X-XSS-Protection設定済み
- [ ] Referrer-Policy設定済み
- [ ] Permissions-Policy設定済み

### コンテンツセキュリティ
- [ ] Mixed Content警告なし
- [ ] 外部リソースはすべてHTTPS
- [ ] Google FormsリンクはHTTPS
- [ ] 画像、CSS、JSすべてHTTPS経由

### アクセス制御
- [ ] .htaccessへのアクセス制限
- [ ] 開発用ファイル（.md, .sh等）へのアクセス制限
- [ ] ディレクトリ一覧の無効化
- [ ] バックアップファイルへのアクセス制限

### パフォーマンス最適化
- [ ] GZIP圧縮有効
- [ ] 適切なキャッシュ設定
- [ ] 画像の最適化

### Xserver管理画面
- [ ] WAF（Webアプリケーションファイアウォール）有効
- [ ] XSS対策ON
- [ ] SQL対策ON
- [ ] 定期バックアップ設定

## 🚨 問題が見つかった場合の対処

### SSL評価が低い場合
1. Xserverサポートに連絡
2. より強力な暗号スイートを要求
3. TLS 1.0/1.1を無効化

### セキュリティヘッダーが不足している場合
1. .htaccess-productionファイルをサーバーにアップロード
2. .htaccessにリネーム
3. パーミッションを644に設定

### Mixed Content警告が出る場合
1. すべてのリソースURLをHTTPSに変更
2. 相対パスの使用を検討
3. 外部リソースのHTTPS対応確認

## 📊 定期メンテナンス

### 毎月
- [ ] SSL証明書の有効期限確認
- [ ] セキュリティスキャンの実施
- [ ] アクセスログの確認

### 3ヶ月ごと
- [ ] セキュリティヘッダーの見直し
- [ ] 不要ファイルの削除
- [ ] バックアップの確認

### 年次
- [ ] 総合セキュリティ監査
- [ ] パスワード変更
- [ ] 災害復旧計画の見直し

## 📞 緊急時連絡先

### Xserverサポート
- メール: support@xserver.ne.jp
- 電話: 06-6147-2580（平日10:00-18:00）

### セキュリティインシデント時の対応
1. サイトを一時的にメンテナンスモードに
2. Xserverサポートに即座に連絡
3. ログの保全と分析
4. 必要に応じて警察・JPCERT/CCに通報