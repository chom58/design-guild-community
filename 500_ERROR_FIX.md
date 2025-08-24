# イベントページ 500エラー対処法

## 🔴 問題
`events.html` にアクセスすると500 Internal Server Errorが発生

## 🔍 原因の可能性

### 1. ファイルパーミッションの問題
- events.htmlのパーミッションが正しくない
- 関連ファイル（CSS, JS）のパーミッションエラー

### 2. .htaccessの設定問題
- RewriteRuleがevents.htmlに影響している
- ErrorDocumentの設定が循環参照を起こしている

### 3. ファイルパスの問題
- data/events.jsonへのアクセス権限
- 相対パスの解決エラー

## ✅ 解決手順

### ステップ1: ファイルパーミッションの確認

Xserverファイルマネージャーで以下を確認：

```
events.html → 644
css/events.css → 644
js/events.js → 644
data/events.json → 644
data/ (フォルダ) → 755
```

### ステップ2: .htaccessの一時的な無効化

1. `.htaccess` を `.htaccess.backup` にリネーム
2. events.htmlにアクセスしてテスト
3. アクセスできたら、.htaccessに問題がある

### ステップ3: 簡易版.htaccessを作成

```apache
# 最小限の.htaccess
AddDefaultCharset UTF-8

# HTTPSリダイレクト
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# 404エラーページ（一時的にコメントアウト）
# ErrorDocument 404 /404.html
```

### ステップ4: events.htmlの簡易版を作成

`events-simple.html` として以下を作成：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>イベント | Design Guild</title>
    <link rel="stylesheet" href="css/dark-theme.css">
</head>
<body>
    <div class="container" style="padding: 50px; text-align: center;">
        <h1>Design Guild イベント</h1>
        <p>次回イベント: 9月1日（日）15:00-17:00</p>
        <p>場所: 渋谷周辺カフェ</p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSe8b_ynVU1_TqQuoV472_eVFScWgj2WWaeRWFZDmKjkIKQi7Q/viewform" 
           target="_blank" style="display: inline-block; margin: 20px 0; padding: 10px 20px; background: #5B9BD5; color: white; text-decoration: none; border-radius: 5px;">
            参加申し込み
        </a>
        <p><a href="index.html">← ホームに戻る</a></p>
    </div>
</body>
</html>
```

### ステップ5: ナビゲーションの暫定対応

index.htmlのイベントリンクを一時的に変更：

```html
<!-- 元のコード -->
<a href="events.html">イベント</a>

<!-- 暫定対応 -->
<a href="#" onclick="alert('イベントページは準備中です。参加申し込みは「参加する」ボタンからお願いします。'); return false;">イベント</a>
```

## 🚀 即時対応策

### オプション1: Google Formsへ直接リンク
index.htmlのイベントボタンを直接Google Formsにリンク

### オプション2: シンプルなイベント情報をindex.htmlに統合
イベント情報をトップページに表示

### オプション3: 静的HTMLファイルとして再作成
JavaScriptを使わない純粋なHTMLページとして作成

## 📞 Xserverサポートへの問い合わせ内容

以下の情報を伝えてサポートを依頼：

```
【問題】
events.htmlにアクセスすると500エラーが発生

【環境】
- ドメイン: https://design-guild.org/
- 該当ファイル: /public_html/events.html
- エラー発生日時: [具体的な日時]

【確認済み事項】
- ファイルは正常にアップロード済み
- index.htmlは正常に表示される
- パーミッションは644に設定済み

【質問】
1. エラーログを確認していただけますか？
2. .htaccessの設定に問題はありますか？
3. mod_rewriteは有効になっていますか？
```

## 🔧 デバッグ用コード

以下をtest-events.phpとして作成し、アップロード：

```php
<?php
// エラー表示を有効化
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ファイルの存在確認
$files = [
    'events.html',
    'css/events.css',
    'js/events.js',
    'data/events.json'
];

echo "<h2>ファイルチェック</h2>";
foreach ($files as $file) {
    if (file_exists($file)) {
        echo "✅ $file: 存在します (権限: " . substr(sprintf('%o', fileperms($file)), -4) . ")<br>";
    } else {
        echo "❌ $file: 存在しません<br>";
    }
}

// サーバー情報
echo "<h2>サーバー情報</h2>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
?>
```

アクセス: https://design-guild.org/test-events.php

## ⚡ 緊急対応

500エラーが解決しない場合の緊急対応：

1. **index.htmlを修正**
   - イベントボタンを無効化または削除
   - イベント情報を直接index.htmlに記載

2. **代替ページへリダイレクト**
   - events.htmlの代わりにGoogle Formsへ直接誘導

3. **メンテナンス表示**
   - 「イベントページは準備中」のメッセージを表示