# セキュリティ設定ガイド

## 🔴 最優先：SSL証明書の設定（HTTPS化）

### Xserverで無料SSL証明書を設定

1. **Xserverサーバーパネルにログイン**
   https://secure.xserver.ne.jp/xapanel/login/xserver/server/

2. **「SSL設定」をクリック**
   - ドメイン > SSL設定

3. **ドメイン選択**
   - `design-guild.org` を選択

4. **「独自SSL設定追加」タブをクリック**

5. **設定内容**
   - サイト: `design-guild.org` （wwwなし）
   - 「確認画面へ進む」をクリック

6. **「追加する」をクリック**
   - 反映まで最大1時間かかります

7. **www付きも同様に設定**
   - サイト: `www.design-guild.org`
   - 同じ手順で追加

## 🟡 HTTPSへの自動リダイレクト設定

SSL証明書が有効になったら、以下の.htaccessを更新：

### /public_html/.htaccess に追加
```apache
# HTTPSへリダイレクト
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# wwwなしに統一（オプション）
RewriteCond %{HTTP_HOST} ^www\.design-guild\.org [NC]
RewriteRule ^(.*)$ https://design-guild.org/$1 [L,R=301]
```

## 🟢 追加のセキュリティ設定

### セキュリティヘッダー（.htaccess）
```apache
# セキュリティヘッダー
<IfModule mod_headers.c>
    # XSS対策
    Header set X-XSS-Protection "1; mode=block"
    
    # クリックジャッキング対策
    Header set X-Frame-Options "SAMEORIGIN"
    
    # MIME-Typeスニッフィング対策
    Header set X-Content-Type-Options "nosniff"
    
    # HTTPS強制（SSL設定後）
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    
    # リファラーポリシー
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    
    # 権限ポリシー
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
```

## 🔍 セキュリティチェックリスト

### 必須項目
- [ ] SSL証明書が有効
- [ ] HTTPからHTTPSへの自動リダイレクト
- [ ] セキュリティヘッダーの設定

### 推奨項目
- [ ] 定期的なバックアップ
- [ ] ファイルパーミッションの確認（644/755）
- [ ] 不要なファイルの削除
- [ ] Xserverの管理画面のパスワード強化
- [ ] WAF（Webアプリケーションファイアウォール）の有効化

## 🛡️ XserverのWAF設定

1. **サーバーパネル > セキュリティ > WAF設定**
2. **ドメインを選択**
3. **「XSS対策」「SQL対策」などをON**
4. **「設定する」をクリック**

## 📊 セキュリティ診断ツール

設定後、以下のツールで確認：

1. **SSL Labs**
   https://www.ssllabs.com/ssltest/
   - SSL証明書の品質をチェック

2. **Security Headers**
   https://securityheaders.com/
   - セキュリティヘッダーをチェック

3. **Mozilla Observatory**
   https://observatory.mozilla.org/
   - 総合的なセキュリティチェック

## ⚠️ 注意事項

### Google Formsのリンクについて
- 現在の実装（外部リンク）は安全です
- フォームデータは直接Googleに送信されます
- サイト側では個人情報を扱っていません

### メールアドレスの公開
- 現在、`umigakikoeruyo@gmail.com` が公開されています
- スパム対策として、以下の方法を検討：
  1. メールアドレスを画像化
  2. JavaScriptで動的に生成
  3. お問い合わせフォームに変更

## 📝 更新された.htaccess（完全版）

```apache
# 文字コード設定
AddDefaultCharset UTF-8

# HTTPSへリダイレクト（SSL証明書設定後に有効化）
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# wwwなしに統一（SSL証明書設定後に有効化）
# RewriteCond %{HTTP_HOST} ^www\.design-guild\.org [NC]
# RewriteRule ^(.*)$ https://design-guild.org/$1 [L,R=301]

# セキュリティヘッダー
<IfModule mod_headers.c>
    Header set X-XSS-Protection "1; mode=block"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
    # HSTS（SSL証明書設定後に有効化）
    # Header always set Strict-Transport-Security "max-age=31536000"
</IfModule>

# キャッシュ設定
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/webp "access plus 1 month"
    ExpiresByType text/css "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
</IfModule>

# GZIP圧縮
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json
</IfModule>

# 404エラーページ
ErrorDocument 404 /404.html

# ディレクトリ一覧の無効化
Options -Indexes

# ファイルへの直接アクセスを制限
<FilesMatch "\.(env|json|md|log|git|gitignore)$">
    Order allow,deny
    Deny from all
</FilesMatch>
```