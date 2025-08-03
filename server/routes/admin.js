/**
 * Admin Routes
 * 管理画面用のAPIエンドポイント
 */

const express = require('express');
const router = express.Router();
const basicAuth = require('express-basic-auth');
const database = require('../services/database');

// Basic認証の設定
const authMiddleware = basicAuth({
    users: { 
        [process.env.ADMIN_USERNAME || 'admin']: process.env.ADMIN_PASSWORD || 'designguild2024'
    },
    challenge: true,
    realm: 'Design Guild Admin'
});

// すべての管理ルートに認証を適用
router.use(authMiddleware);

// ===================================
// 参加者一覧取得
// ===================================
router.get('/participants', async (req, res) => {
    try {
        const {
            page = 1,
            limit = 50,
            status,
            profession
        } = req.query;

        const result = await database.getParticipants({
            page: parseInt(page),
            limit: parseInt(limit),
            status,
            profession
        });

        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        console.error('参加者一覧取得エラー:', error);
        res.status(500).json({
            success: false,
            message: 'データ取得に失敗しました'
        });
    }
});

// ===================================
// 参加者詳細取得
// ===================================
router.get('/participants/:id', async (req, res) => {
    try {
        const participant = await database.getParticipantById(req.params.id);
        
        if (!participant) {
            return res.status(404).json({
                success: false,
                message: '参加者が見つかりません'
            });
        }

        res.json({
            success: true,
            data: participant
        });
    } catch (error) {
        console.error('参加者詳細取得エラー:', error);
        res.status(500).json({
            success: false,
            message: 'データ取得に失敗しました'
        });
    }
});

// ===================================
// 参加者情報更新
// ===================================
router.put('/participants/:id', async (req, res) => {
    try {
        const { status, tags, notes } = req.body;
        
        const updates = {};
        if (status) updates.status = status;
        if (tags) updates.tags = tags;
        if (notes !== undefined) updates.notes = notes;

        const updated = await database.updateParticipant(req.params.id, updates);

        res.json({
            success: true,
            data: updated
        });
    } catch (error) {
        console.error('参加者更新エラー:', error);
        res.status(500).json({
            success: false,
            message: error.message || '更新に失敗しました'
        });
    }
});

// ===================================
// 参加者削除
// ===================================
router.delete('/participants/:id', async (req, res) => {
    try {
        await database.deleteParticipant(req.params.id);
        
        res.json({
            success: true,
            message: '参加者を削除しました'
        });
    } catch (error) {
        console.error('参加者削除エラー:', error);
        res.status(500).json({
            success: false,
            message: error.message || '削除に失敗しました'
        });
    }
});

// ===================================
// 統計情報取得
// ===================================
router.get('/statistics', async (req, res) => {
    try {
        const stats = await database.getStatistics();
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('統計情報取得エラー:', error);
        res.status(500).json({
            success: false,
            message: 'データ取得に失敗しました'
        });
    }
});

// ===================================
// CSVエクスポート
// ===================================
router.get('/export/csv', async (req, res) => {
    try {
        const csv = await database.exportToCSV();
        
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="participants_${new Date().toISOString().slice(0, 10)}.csv"`);
        
        // BOMを追加（Excelでの日本語表示対応）
        res.send('\uFEFF' + csv);
    } catch (error) {
        console.error('CSVエクスポートエラー:', error);
        res.status(500).json({
            success: false,
            message: 'エクスポートに失敗しました'
        });
    }
});

// ===================================
// メール送信テスト
// ===================================
router.post('/test-email', async (req, res) => {
    try {
        const emailService = require('../services/email');
        const result = await emailService.testConnection();
        
        res.json({
            success: result.success,
            message: result.message
        });
    } catch (error) {
        console.error('メールテストエラー:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;