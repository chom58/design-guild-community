# 📅 イベント情報の更新方法

## 現在の構成

現在、イベント情報は2つの方法で管理されています：

### 1. シンプル版（現在使用中）
- **ファイル**: `events-fixed.html`（または`events-simple.html`）
- **更新方法**: HTMLを直接編集
- **メリット**: 簡単、エラーが起きにくい

### 2. JSON版（将来的に使用）
- **ファイル**: `data/events.json` + `events.html`
- **更新方法**: JSONファイルを編集
- **メリット**: データと表示の分離、複数イベント管理

## 🔧 現在の更新方法（HTML直接編集）

### ステップ1: events-fixed.htmlを編集

```html
<!-- イベントタイトルを変更 -->
<h2 class="event-title">🎨 Design Guild 10月交流会</h2>

<!-- 日時を変更 -->
<span class="detail-value">2025年10月6日（日）15:00-17:00</span>

<!-- 場所を変更 -->
<span class="detail-value">渋谷周辺カフェ（参加者に詳細をお知らせ）</span>

<!-- 定員を変更 -->
<span class="detail-value">20名（先着順）</span>
```

### ステップ2: ファイルをアップロード
1. 編集した`events-fixed.html`をXserverにアップロード
2. `events-simple.html`にリネーム（既存を上書き）

## 📝 更新箇所チェックリスト

イベント更新時に変更する項目：

- [ ] イベントタイトル（例：9月→10月）
- [ ] 日時
- [ ] 場所（変更があれば）
- [ ] 定員
- [ ] 特徴タグ（必要に応じて）
- [ ] 申し込み締切（本文中）

## 🎯 具体的な編集例

### 10月イベントへの更新例

```html
<!-- 変更前 -->
<h2 class="event-title">🎨 Design Guild 9月交流会</h2>
<span class="detail-value">2025年9月1日（日）15:00-17:00</span>

<!-- 変更後 -->
<h2 class="event-title">🎨 Design Guild 10月交流会</h2>
<span class="detail-value">2025年10月6日（日）15:00-17:00</span>
```

### 特別イベントの例

```html
<!-- ワークショップの場合 -->
<h2 class="event-title">🛠️ Design Guild AIツール活用ワークショップ</h2>

<div class="detail-item">
    <span class="detail-label">💰 参加費:</span>
    <span class="detail-value">3,000円（資料代込み）</span>
</div>

<div class="event-features">
    <span class="feature-tag">ハンズオン形式</span>
    <span class="feature-tag">実践的スキル習得</span>
    <span class="feature-tag">少人数制</span>
    <span class="feature-tag">初心者OK</span>
</div>
```

## 🚀 将来的な改善案

### オプション1: Google Sheetsと連携
- Google Sheetsでイベント管理
- Google Apps Scriptで自動更新
- 非エンジニアでも更新可能

### オプション2: 簡易CMS導入
- Netlify CMSなどの利用
- Webインターフェースで更新
- GitHubと連携

### オプション3: JSONファイル運用
- `data/events.json`を編集
- JavaScriptで動的に表示
- 複数イベントの管理が容易

## 📋 現在の運用フロー

```
1. イベント企画
   ↓
2. events-fixed.htmlを編集
   ↓
3. ローカルでプレビュー確認
   ↓
4. Xserverにアップロード
   ↓
5. 本番サイトで確認
```

## ⚠️ 注意事項

### やってはいけないこと
- Google FormsのURLを変更しない（申し込みが届かなくなる）
- 文字コードを変更しない（文字化けの原因）
- CSSクラス名を変更しない（デザインが崩れる）

### 必ず確認すること
- 日付の曜日が正しいか
- 参加申し込みボタンが機能するか
- モバイルでも正しく表示されるか

## 💡 Tips

### 絵文字の使い方
```html
🎨 アート系イベント
🛠️ ワークショップ
🎉 パーティー
☕ カフェ交流会
🏢 ビジネス系
💡 アイデアソン
```

### 色の変更
```html
<!-- シアン（デフォルト） -->
color: #00FFFF;

<!-- マゼンタ -->
color: #FF00FF;

<!-- イエロー -->
color: #FFFF00;
```

---

**簡単な更新**: HTMLファイルの該当箇所を編集してアップロードするだけ！
**複雑な更新**: お手伝いしますので、お声がけください。