# Xserver アップロードガイド

## 📁 アップロードするファイル構成

### 必要なファイル・フォルダ
```
/
├── index.html          # メインページ
├── events.html         # イベントページ
├── 404.html           # 404エラーページ
├── robots.txt         # SEO用
├── sitemap.xml        # サイトマップ
├── manifest.json      # PWA設定
├── favicon.ico        # ファビコン
├── favicon-*.png      # 各サイズのファビコン
├── css/               # スタイルシート
│   ├── dark-theme.css
│   ├── events.css
│   ├── form-mobile.css
│   ├── performance-mobile.css
│   ├── reset.css
│   ├── responsive-images.css
│   ├── responsive-typography.css
│   ├── style.css
│   └── touch-optimization.css
├── js/                # JavaScript
│   ├── main.js
│   ├── dark-theme.js
│   └── events.js
├── images/            # 画像
│   ├── logo.png
│   ├── chomu.png
│   ├── nozawa.png
│   └── favicon-*.png
├── fonts/             # フォント（必要な場合）
└── data/              # データ
    └── events.json
```

### 不要なファイル（アップロードしない）
```
❌ node_modules/
❌ package.json
❌ package-lock.json
❌ .git/
❌ .gitignore
❌ README.md
❌ CLAUDE.md
❌ *.md（ドキュメント類）
❌ server/（サーバーサイドコード）
❌ admin/（管理画面）
❌ test-*.html（テストファイル）
❌ create-*.html（ツール類）
❌ google-apps-script.gs
❌ start-server.sh
❌ amplify.yml
❌ _redirects
```

## 🚀 アップロード手順

### 1. Xserver ファイルマネージャーを使用

1. **Xserverのサーバーパネルにログイン**
   - https://secure.xserver.ne.jp/xapanel/login/xserver/server/

2. **ファイルマネージャーを開く**
   - 「ファイル管理」をクリック

3. **ドメインのフォルダに移動**
   ```
   /home/[サーバーID]/[ドメイン名]/public_html/
   ```

4. **ファイルをアップロード**
   - 上記の「必要なファイル・フォルダ」をアップロード
   - フォルダ構造を維持したままアップロード

### 2. FTPクライアントを使用（推奨）

#### FTP接続情報
```
FTPサーバー名: sv[番号].xserver.jp
FTPユーザー名: [サーバーID]
FTPパスワード: [サーバーパスワード]
```

#### 推奨FTPクライアント
- **Windows**: FileZilla, WinSCP
- **Mac**: FileZilla, Cyberduck

#### アップロード手順
1. FTPクライアントで接続
2. `/[ドメイン名]/public_html/` に移動
3. ローカルの `design-guild` フォルダの中身をアップロード

## ⚙️ アップロード後の設定

### 1. .htaccessファイルの作成（必要に応じて）

`public_html/.htaccess`
```apache
# 文字コード設定
AddDefaultCharset UTF-8

# キャッシュ設定
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
</IfModule>

# GZIP圧縮
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript
</IfModule>

# 404エラーページ
ErrorDocument 404 /404.html

# HTTPSリダイレクト（SSL証明書設定後）
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

### 2. パーミッション設定
```
ファイル: 644
フォルダ: 755
```

### 3. SSL証明書の設定
1. Xserverサーバーパネル → 「SSL設定」
2. 対象ドメインを選択
3. 「無料独自SSL設定」を追加

## 📝 チェックリスト

アップロード前：
- [ ] 不要なファイルを削除
- [ ] 画像を最適化（サイズ調整）
- [ ] JavaScriptのconsole.logを削除（本番環境用）
- [ ] Google FormsのURLが正しいか確認

アップロード後：
- [ ] トップページが表示される
- [ ] CSSが適用されている
- [ ] JavaScriptが動作している
- [ ] 画像が表示される
- [ ] 「参加する」ボタンがGoogle Formsに遷移する
- [ ] レスポンシブデザインが機能している
- [ ] 404ページが動作する

## 🔧 トラブルシューティング

### 文字化けする場合
- ファイルの文字コードをUTF-8に統一
- .htaccessに `AddDefaultCharset UTF-8` を追加

### CSSが反映されない場合
- パスが正しいか確認（相対パス）
- キャッシュをクリア（Ctrl+F5）

### 画像が表示されない場合
- ファイル名の大文字小文字を確認
- パーミッションを確認（644）

### JavaScriptエラーが出る場合
- ブラウザのコンソールでエラー内容を確認
- パスが正しいか確認

## 📧 お問い合わせ

問題が解決しない場合は、Xserverのサポートに連絡：
- メール: support@xserver.ne.jp
- 電話: 06-6147-2580（平日10:00-18:00）