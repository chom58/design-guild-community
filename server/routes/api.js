/**
 * API Routes
 * 参加申込みとデータ取得のエンドポイント
 */

const express = require('express');
const router = express.Router();
const database = require('../services/database');
const emailService = require('../services/email');

// ===================================
// 参加申込みエンドポイント
// ===================================
router.post('/join', async (req, res) => {
    try {
        const {
            name,
            email,
            profession,
            otherProfession,
            experience,
            motivation,
            portfolio,
            newsletter
        } = req.body;

        // バリデーション
        if (!name || !email || !profession || !motivation) {
            return res.status(400).json({
                success: false,
                message: '必須項目を入力してください'
            });
        }

        // メールアドレスの形式チェック
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: '有効なメールアドレスを入力してください'
            });
        }

        // 参加者データの作成
        const participantData = {
            name,
            email,
            profession: profession === 'other' ? otherProfession : profession,
            experience,
            motivation,
            portfolio,
            newsletter: newsletter === 'true' || newsletter === true
        };

        // データベースに保存
        const newParticipant = await database.addParticipant(participantData);

        // ウェルカムメール送信（非同期で実行）
        emailService.sendWelcomeEmail(participantData).catch(err => {
            console.error('ウェルカムメール送信エラー:', err);
        });

        // 管理者通知メール送信（非同期で実行）
        emailService.sendAdminNotification(participantData).catch(err => {
            console.error('管理者通知メール送信エラー:', err);
        });

        res.json({
            success: true,
            message: '参加申し込みを受け付けました',
            data: {
                id: newParticipant.id,
                name: newParticipant.name
            }
        });

    } catch (error) {
        console.error('参加申込エラー:', error);
        res.status(500).json({
            success: false,
            message: 'サーバーエラーが発生しました'
        });
    }
});

// ===================================
// 統計情報取得エンドポイント
// ===================================
router.get('/stats', async (req, res) => {
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
// 職種リスト取得エンドポイント
// ===================================
router.get('/professions', (req, res) => {
    const professions = [
        { value: 'graphic-designer', label: 'グラフィックデザイナー' },
        { value: 'editorial-designer', label: 'エディトリアルデザイナー' },
        { value: 'web-designer', label: 'Webデザイナー' },
        { value: 'ui-ux-designer', label: 'UI/UXデザイナー' },
        { value: 'frontend-engineer', label: 'フロントエンドエンジニア' },
        { value: 'backend-engineer', label: 'バックエンドエンジニア' },
        { value: 'ai-engineer', label: 'AIエンジニア' },
        { value: 'illustrator', label: 'イラストレーター' },
        { value: 'photographer', label: 'フォトグラファー' },
        { value: 'artist', label: 'アーティスト' },
        { value: 'video-director', label: '映像ディレクター' },
        { value: 'motion-designer', label: 'モーションデザイナー' },
        { value: 'magician', label: 'マジシャン' },
        { value: 'business-developer', label: '新規事業開発' },
        { value: 'planner', label: 'プランナー' },
        { value: 'package-designer', label: 'パッケージデザイナー' },
        { value: 'industrial-designer', label: 'インダストリアルデザイナー' },
        { value: 'cg-designer', label: 'CGデザイナー' },
        { value: 'composer', label: 'コンポーザー' },
        { value: 'fashion-designer', label: 'アパレルデザイナー' },
        { value: 'textile-designer', label: 'テキスタイルデザイナー' },
        { value: 'art-student', label: '美大生' },
        { value: 'fashion-student', label: '服飾学生' },
        { value: 'beauty-student', label: '美容学生' },
        { value: 'other', label: 'その他' }
    ];

    res.json({
        success: true,
        data: professions
    });
});

// ===================================
// ヘルスチェックエンドポイント
// ===================================
router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;