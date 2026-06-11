# 🚨 500エラー緊急対処

## 現在の状況
- index.html, events-simple.html, CSSファイル、JSファイルをアップロードしても500エラー
- これはサーバー側の設定問題の可能性大

## 診断手順

### 1. まず`test.html`をアップロード
最小限のHTMLファイルで動作確認
- `test.html`をアップロード
- https://design-guild.org/test.html にアクセス
- 表示されれば→HTMLは問題なし
- 500エラー→サーバー設定の問題

### 2. `.htaccess`を確認
```bash
# .htaccessをバックアップして削除
mv .htaccess .htaccess.backup
```
その後、index.htmlにアクセスしてみる

### 3. `index-minimal.html`を試す
- `index-minimal.html`をアップロード
- `index.html`にリネーム
- 外部ファイル依存なしの完全独立版

## 🔍 500エラーの一般的な原因

### サーバー側の問題
1. **.htaccessの構文エラー**
   - 特にRewriteRuleが原因になることが多い
   - 解決: .htaccessを一時削除

2. **ファイルパーミッション**
   - ファイル: 644
   - ディレクトリ: 755
   - 解決: Xserverファイルマネージャーで確認

3. **PHPエラー（もしPHPが有効な場合）**
   - <?php タグが含まれていないか確認

4. **文字コード問題**
   - UTF-8 BOMが含まれている可能性
   - 解決: UTF-8（BOMなし）で保存

## ✅ 即効性のある解決策

### オプション1: 最小限HTMLを使用
```bash
1. index-minimal.htmlをアップロード
2. 既存のindex.htmlを削除
3. index-minimal.htmlをindex.htmlにリネーム
```

### オプション2: .htaccess削除
```bash
1. .htaccessを削除またはリネーム
2. index.htmlにアクセス
3. 動作したら.htaccessが原因
```

### オプション3: 別ディレクトリでテスト
```bash
1. /test/ ディレクトリを作成
2. そこにindex-minimal.htmlをアップロード
3. https://design-guild.org/test/ でアクセス
```

## 📞 Xserverサポートへの問い合わせ

もし上記で解決しない場合：

```
件名: 500 Internal Server Errorが発生

お世話になっております。
design-guild.orgで500エラーが発生しており、原因が特定できません。

【状況】
- HTMLファイルをアップロードすると500エラー
- .htaccessは最小限の設定
- ファイルパーミッションは正常（644/755）

【確認事項】
1. エラーログを確認していただけますか？
2. mod_rewriteは有効ですか？
3. 何か特別な制限がかかっていますか？

よろしくお願いいたします。
```

## 🎯 今すぐやること

1. **`test.html`をアップロード**してアクセス
   - 動作する→index.htmlの問題
   - 動作しない→サーバー設定の問題

2. **`.htaccess`を削除**してテスト

3. **`index-minimal.html`を`index.html`として使用**

4. それでもダメなら**Xserverサポートに連絡**

これで必ず原因が特定できます。