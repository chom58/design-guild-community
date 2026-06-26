# ✅ .htaccess問題解決ガイド

## 🎯 原因判明
`.htaccess`が500エラーの原因でした！

## 📋 解決手順

### ステップ1: 最小限の.htaccessから開始

1. **`.htaccess-minimal`をアップロード**
2. **`.htaccess`にリネーム**
3. **サイトにアクセスして動作確認**

```apache
# 最小限の設定のみ
AddDefaultCharset UTF-8
Options -Indexes
```

### ステップ2: HTTPSリダイレクトを追加（動作確認後）

1. **`.htaccess-step2`をアップロード**
2. **`.htaccess`に上書き**
3. **HTTPからHTTPSへのリダイレクト確認**

### ステップ3: セキュリティ強化（最終版）

1. **`.htaccess-step3`をアップロード**  
2. **`.htaccess`に上書き**
3. **すべての機能を確認**

## 🔍 .htaccessで500エラーが起きる原因

### よくある原因と対策

1. **RewriteEngine**
   - Xserverでmod_rewriteが無効の可能性
   - 解決: `<IfModule mod_rewrite.c>`で囲む

2. **構文エラー**
   - スペースや改行の問題
   - 解決: 最小限から始める

3. **Headersモジュール**
   - mod_headersが無効の可能性
   - 解決: `<IfModule mod_headers.c>`で囲む

4. **相対パス/絶対パス**
   - ErrorDocumentのパス指定ミス
   - 解決: `/`から始まる絶対パスを使用

## 🚀 今すぐやること

### 1. 最小限バージョンをアップロード
```
.htaccess-minimal → .htaccess
```

### 2. 動作確認
- https://design-guild.org/ にアクセス
- 正常に表示されることを確認

### 3. 段階的に機能追加
- step2（HTTPSリダイレクト）
- step3（セキュリティヘッダー）

## ⚠️ 注意事項

### やってはいけないこと
- いきなり全機能入りの.htaccessを使用
- 動作確認なしに次のステップへ進む
- バックアップを取らない

### 各ステップで確認すること
1. サイトが表示される
2. CSSが適用される
3. JavaScriptが動作する
4. 画像が表示される

## 📝 トラブルシューティング

### もしステップ2で500エラーが出たら
```apache
# RewriteEngineの行をコメントアウト
# RewriteEngine On
```
これでXserverがmod_rewriteをサポートしていないことが分かります。

### もしステップ3で500エラーが出たら
```apache
# Headersセクションをコメントアウト
# <IfModule mod_headers.c>
#   ...
# </IfModule>
```

## 🎉 完了後の状態

最終的に以下が実現されます：
- ✅ HTTPSへの自動リダイレクト
- ✅ セキュリティヘッダー設定
- ✅ ファイル圧縮
- ✅ キャッシュ最適化
- ✅ 500エラーなし！

---

**重要**: 必ず段階的にテストしてください。一度に全部やると、何が原因かわからなくなります。