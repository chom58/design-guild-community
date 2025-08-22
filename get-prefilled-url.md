# Google Forms 事前入力URL取得手順

## 手順

### 1. Google Formsを開く
https://docs.google.com/forms/d/e/1FAIpQLSe8b_ynVU1_TqQuoV472_eVFScWgj2WWaeRWFZDmKjkIKQi7Q/viewform

### 2. 各フィールドに以下を入力：
- **お名前(ニックネームでok)**: テスト太郎
- **メールアドレス**: test@example.com  
- **LINE ID**: test_line_id
- **職種・専門分野**: 適当に選択
- **経験年数**: 1-3
- **参加動機・期待すること**: これはテストです
- **ポートフォリオURL**: https://example.com

### 3. 事前入力リンクを取得
1. 右上の「⋮」（3点メニュー）をクリック
2. 「事前入力したリンクを取得」を選択
3. 「リンクを取得」ボタンをクリック
4. 生成されたURLをコピー

### 4. URLを分析
コピーしたURLは以下のような形式になっています：
```
https://docs.google.com/forms/d/e/.../viewform?
entry.XXXXXXX=テスト太郎&
entry.YYYYYYY=test@example.com&
entry.ZZZZZZZ=test_line_id&
...
```

### 5. エントリーIDを抽出
URLから以下の情報を抽出してください：

| フィールド名 | エントリーID | 値の例 |
|------------|-------------|--------|
| お名前 | entry.??????? | テスト太郎 |
| メールアドレス | entry.??????? | test@example.com |
| LINE ID | entry.??????? | test_line_id |
| 職種・専門分野 | entry.??????? | （選択した値） |
| 経験年数 | entry.??????? | 1-3 |
| 参加動機 | entry.??????? | これはテストです |
| ポートフォリオURL | entry.??????? | https://example.com |

## 重要
**この事前入力URLを教えてください。正しいエントリーIDを抽出して、コードを修正します。**