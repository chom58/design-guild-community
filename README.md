# Design Guild - 混ざる、生まれる、未知なる表現

Design Guildは、異分野のクリエイターが集まり、新しい価値を創造するコミュニティプラットフォームです。

## 🎨 コンセプト

グラフィックデザイナー、エンジニア、ファッションデザイナー、データサイエンティスト、マジシャンなど、多様な分野のクリエイターが混ざり合い、今までにない表現や価値を生み出すことを目指しています。

## 🌟 特徴

- **クロスジャンルコラボレーション**: 異なる専門性の化学反応
- **実験的プロジェクト**: 新しい表現への挑戦
- **コミュニティイベント**: リミックス・ワークショップ、ポートフォリオ・ナイトなど
- **多様な参加者**: 36名以上の多彩なクリエイター

## 🛠 技術スタック

- HTML5 / CSS3
- JavaScript (Vanilla)
- Three.js (WebGL背景)
- ダークテーマ & ネオンデザイン
- レスポンシブ対応

## 📱 機能

- 参加申し込みフォーム
- 運営メンバー詳細モーダル
- パララックスエフェクト
- 3Dカードアニメーション
- カウンターアニメーション

## 🚀 セットアップ

### 基本セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/[username]/design-guild.git

# ディレクトリに移動
cd design-guild

# 依存関係をインストール
npm install

# 環境変数の設定
cp .env.example .env
# .envファイルを編集して必要な設定を行う
```

### サーバー起動

```bash
# 簡単な起動方法
./start-server.sh

# または手動で起動
npm start

# 開発モード（自動リロード）
npm run dev
```

### アクセスURL

- 🌐 Website: http://localhost:3000
- 🔐 Admin: http://localhost:3000/admin
- 📡 API: http://localhost:3000/api

### 管理画面のログイン

デフォルトの認証情報（.envで変更可能）:
- Username: `admin`
- Password: `designguild2024`

## 📁 ディレクトリ構成

```
design-guild/
├── index.html            # メインHTML
├── css/
│   ├── reset.css        # CSSリセット
│   └── dark-theme.css   # ダークテーマスタイル
├── js/
│   └── dark-theme.js    # メインJavaScript
├── images/              # 画像ファイル
│   ├── chomu.png       # 運営メンバー写真
│   └── nozawa.png      # 運営メンバー写真
├── favicon.ico          # ファビコン
├── manifest.json        # PWA設定
├── robots.txt           # SEO設定
└── sitemap.xml          # サイトマップ
```

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 👥 運営メンバー

- **ちょむ** - クリエイターにやたらと縁がある人
- **野澤** - 雑誌の凄腕アートディレクター

## 📧 お問い合わせ

hello@design-guild.jp

---

Design Guild - Where different talents mix and create unknown expressions.