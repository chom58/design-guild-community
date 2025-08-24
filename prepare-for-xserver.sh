#!/bin/bash

# Xserver用にファイルを準備するスクリプト

echo "Xserver用のファイル準備を開始します..."

# 出力ディレクトリを作成
OUTPUT_DIR="xserver-upload"
rm -rf $OUTPUT_DIR
mkdir -p $OUTPUT_DIR

# 必要なファイルをコピー
echo "必要なファイルをコピー中..."

# HTMLファイル（テストファイル以外）
cp index.html $OUTPUT_DIR/
cp events.html $OUTPUT_DIR/
cp 404.html $OUTPUT_DIR/

# 設定ファイル
cp robots.txt $OUTPUT_DIR/
cp sitemap.xml $OUTPUT_DIR/
cp manifest.json $OUTPUT_DIR/
cp favicon.ico $OUTPUT_DIR/
cp favicon-*.png $OUTPUT_DIR/

# ディレクトリをコピー
cp -r css $OUTPUT_DIR/
cp -r js $OUTPUT_DIR/
cp -r images $OUTPUT_DIR/
cp -r fonts $OUTPUT_DIR/
cp -r data $OUTPUT_DIR/

# 不要なファイルを削除
echo "不要なファイルを削除中..."

# 開発用ファイルを削除
rm -f $OUTPUT_DIR/*.md
rm -f $OUTPUT_DIR/.gitignore
rm -f $OUTPUT_DIR/package*.json
rm -f $OUTPUT_DIR/*.sh
rm -f $OUTPUT_DIR/*.gs
rm -f $OUTPUT_DIR/amplify.yml
rm -f $OUTPUT_DIR/_redirects

# テスト・ツール系HTMLを削除
rm -f $OUTPUT_DIR/test-*.html
rm -f $OUTPUT_DIR/create-*.html
rm -f $OUTPUT_DIR/get-*.html
rm -f $OUTPUT_DIR/find-*.html
rm -f $OUTPUT_DIR/setup-*.html
rm -f $OUTPUT_DIR/google-forms-*.html
rm -f $OUTPUT_DIR/optimize-*.html

# 管理画面を削除
rm -rf $OUTPUT_DIR/admin
rm -rf $OUTPUT_DIR/server

# console.logを削除（本番用）
echo "デバッグコードを削除中..."
for file in $OUTPUT_DIR/js/*.js; do
    if [ -f "$file" ]; then
        # console.logをコメントアウト
        sed -i.bak 's/console\.log/\/\/console.log/g' "$file"
        sed -i.bak 's/console\.error/\/\/console.error/g' "$file"
        rm "$file.bak"
    fi
done

# .htaccessファイルを作成
echo ".htaccessファイルを作成中..."
cat > $OUTPUT_DIR/.htaccess << 'EOF'
# 文字コード設定
AddDefaultCharset UTF-8

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

# セキュリティヘッダー
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
EOF

# ZIPファイルを作成
echo "ZIPファイルを作成中..."
cd $OUTPUT_DIR
zip -r ../design-guild-xserver.zip .
cd ..

echo "========================================="
echo "✅ 準備完了！"
echo "========================================="
echo ""
echo "📁 アップロード用フォルダ: $OUTPUT_DIR/"
echo "📦 ZIPファイル: design-guild-xserver.zip"
echo ""
echo "次のステップ:"
echo "1. FTPクライアントで $OUTPUT_DIR の中身をアップロード"
echo "   または"
echo "   design-guild-xserver.zip をアップロードして解凍"
echo ""
echo "2. アップロード先:"
echo "   /home/[サーバーID]/[ドメイン名]/public_html/"
echo ""
echo "3. アップロード後の確認:"
echo "   - https://[あなたのドメイン]/"
echo "   - 「参加する」ボタンの動作確認"
echo "   - レスポンシブデザインの確認"
echo ""
echo "========================================="

# ファイルサイズを表示
echo "ファイルサイズ情報:"
du -sh $OUTPUT_DIR
ls -lh design-guild-xserver.zip