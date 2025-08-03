/**
 * Design Guild - Express Server
 * APIバックエンドとメール通知システム
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// セキュリティミドルウェア
app.use(helmet({
    contentSecurityPolicy: false, // 開発環境用
}));

// レート制限
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分
    max: 100, // リクエスト数上限
    message: 'リクエストが多すぎます。しばらくしてから再度お試しください。'
});

app.use('/api/', limiter);

// CORS設定
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

// ボディパーサー
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, '..')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// ルート設定
app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);

// エラーハンドリング
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
    });
});

// 404ハンドリング
app.use((req, res) => {
    if (req.path.startsWith('/api')) {
        res.status(404).json({
            success: false,
            message: 'APIエンドポイントが見つかりません'
        });
    } else {
        res.sendFile(path.join(__dirname, '../404.html'));
    }
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`
    ========================================
    🚀 Design Guild Server Started
    ========================================
    
    📍 Server: http://localhost:${PORT}
    🌐 Website: http://localhost:${PORT}
    🔐 Admin: http://localhost:${PORT}/admin
    📧 Email: ${process.env.EMAIL_FROM || 'Not configured'}
    
    ========================================
    `);
});