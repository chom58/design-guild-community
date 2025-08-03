#!/bin/bash

echo "========================================="
echo "🚀 Design Guild Server 起動スクリプト"
echo "========================================="

# .envファイルのチェック
if [ ! -f .env ]; then
    echo "⚠️  .envファイルが見つかりません。"
    echo "📝 .env.exampleをコピーして.envを作成してください："
    echo ""
    echo "   cp .env.example .env"
    echo ""
    echo "その後、.envファイルを編集して必要な設定を行ってください。"
    exit 1
fi

# node_modulesのチェック
if [ ! -d node_modules ]; then
    echo "📦 依存関係をインストールしています..."
    npm install
fi

# データディレクトリの作成
if [ ! -d data ]; then
    mkdir -p data
    echo "📁 データディレクトリを作成しました"
fi

echo ""
echo "🌟 サーバーを起動します..."
echo ""

# サーバー起動
npm start