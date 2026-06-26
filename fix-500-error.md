# 500エラー緊急対処法

## 🔴 問題
index.htmlにアクセスすると500 Internal Server Errorが発生

## 🔍 考えられる原因

1. **新しいJavaScriptファイルが存在しない**
   - `js/smooth-scroll.js`
   - `js/mobile-menu.js`
   - これらがサーバーに存在しないため404→500エラー

2. **.htaccessの問題**
   - リライトルールが影響している可能性

3. **ファイルパーミッション**
   - 新しいファイルの権限設定

## ✅ 即座の解決策

### 方法1: JavaScriptを一時的に無効化

index.htmlから以下の行を削除またはコメントアウト：

```html
<!-- 一時的にコメントアウト
<script src="js/smooth-scroll.js"></script>
<script src="js/mobile-menu.js"></script>
-->
```

### 方法2: 既存の安全なバージョンに戻す

```bash
# バックアップから復元（もしあれば）
cp index.html.backup index.html
```

### 方法3: 最小限の修正版を使用

以下の手順で修正：

1. index.htmlを編集
2. 新しいJavaScriptの読み込みを削除
3. 既存の動作確認済みのスクリプトのみ残す

## 📝 修正版index.html（JavaScriptセクション）

```html
<!-- JavaScript -->
<script src="js/dark-theme.js"></script>
<script src="js/main.js"></script>
<script src="js/email-protection.js"></script>
<!-- 新しいスクリプトは後でアップロード確認後に追加
<script src="js/smooth-scroll.js"></script>
<script src="js/mobile-menu.js"></script>
<script src="js/lazy-load.js"></script>
<script src="js/touch-optimize.js"></script>
-->
```

## 🚀 段階的な復旧手順

### ステップ1: 最小限の動作確認
1. 新しいJavaScriptの参照を削除
2. サイトが表示されることを確認

### ステップ2: ファイルを1つずつアップロード
1. `js/smooth-scroll.js`をアップロード
2. index.htmlに追加して動作確認
3. 問題なければ次のファイルへ

### ステップ3: 新しいセクションは後回し
1. まず基本機能を復旧
2. その後、新セクションを追加

## 🔧 .htaccessの確認

もし.htaccessが原因の場合：

```apache
# 最小限の.htaccess
AddDefaultCharset UTF-8

# エラードキュメント（一時的に無効化）
# ErrorDocument 404 /404.html
# ErrorDocument 500 /500.html

# リライトルール（一時的に無効化）
# RewriteEngine On
```

## ⚡ 緊急用HTML

最悪の場合、以下の最小限HTMLを使用：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Design Guild</title>
    <link rel="stylesheet" href="css/dark-theme.css">
    <style>
        body {
            background: #0A0F1C;
            color: #F8FAFC;
            font-family: sans-serif;
            padding: 50px;
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            color: #00FFFF;
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            padding: 15px 30px;
            background: #00FFFF;
            color: #0A0F1C;
            text-decoration: none;
            border-radius: 25px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>DESIGN GUILD</h1>
        <p>混ざる、生まれる、未知なる表現</p>
        <p>異分野クリエイターが境界を越えて協創する実験的コミュニティ</p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSe8b_ynVU1_TqQuoV472_eVFScWgj2WWaeRWFZDmKjkIKQi7Q/viewform" 
           target="_blank" 
           class="button">
            参加申し込み
        </a>
        <p><a href="events-simple.html">イベント情報</a></p>
    </div>
</body>
</html>
```

これをindex.htmlとして使用すれば、最低限の機能は維持できます。