#!/bin/bash

echo "セクション統合を開始..."

# バックアップ作成
cp index.html index.html.backup.$(date +%Y%m%d_%H%M%S)

# 一時ファイル作成
temp_file="index_temp.html"

# CTAセクションの行番号を取得
cta_line=$(grep -n "<!-- CTA -->" index.html | cut -d: -f1)

# CTAセクション前までをコピー
head -n $((cta_line - 1)) index.html > $temp_file

# 新しいセクションを追加
echo "" >> $temp_file
echo "    <!-- 参加者の声セクション -->" >> $temp_file
cat sections/testimonials.html >> $temp_file
echo "" >> $temp_file

echo "    <!-- 参加方法セクション -->" >> $temp_file  
cat sections/how-to-join.html >> $temp_file
echo "" >> $temp_file

echo "    <!-- FAQセクション -->" >> $temp_file
cat sections/faq.html >> $temp_file
echo "" >> $temp_file

# CTAセクション以降を追加
tail -n +$cta_line index.html >> $temp_file

# 元のファイルを置き換え
mv $temp_file index.html

echo "✅ セクション統合完了！"