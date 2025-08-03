/**
 * データベースサービス
 * JSONファイルを使用した簡易データベース
 */

const fs = require('fs').promises;
const path = require('path');

class Database {
    constructor() {
        this.dbPath = path.join(__dirname, '../../data/participants.json');
        this.initDatabase();
    }

    async initDatabase() {
        try {
            await fs.access(this.dbPath);
        } catch (error) {
            // ファイルが存在しない場合は作成
            const initialData = {
                participants: [],
                metadata: {
                    created: new Date().toISOString(),
                    lastUpdated: new Date().toISOString(),
                    totalCount: 0
                }
            };
            
            await fs.mkdir(path.dirname(this.dbPath), { recursive: true });
            await fs.writeFile(this.dbPath, JSON.stringify(initialData, null, 2));
            console.log('📁 データベースを初期化しました');
        }
    }

    async readDatabase() {
        try {
            const data = await fs.readFile(this.dbPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('データベース読み込みエラー:', error);
            throw error;
        }
    }

    async writeDatabase(data) {
        try {
            data.metadata.lastUpdated = new Date().toISOString();
            await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('データベース書き込みエラー:', error);
            throw error;
        }
    }

    async addParticipant(participantData) {
        const db = await this.readDatabase();
        
        const newParticipant = {
            id: Date.now().toString(),
            ...participantData,
            createdAt: new Date().toISOString(),
            status: 'pending',
            tags: []
        };

        db.participants.push(newParticipant);
        db.metadata.totalCount = db.participants.length;
        
        await this.writeDatabase(db);
        
        return newParticipant;
    }

    async getParticipants(options = {}) {
        const db = await this.readDatabase();
        let participants = [...db.participants];

        // フィルタリング
        if (options.status) {
            participants = participants.filter(p => p.status === options.status);
        }

        if (options.profession) {
            participants = participants.filter(p => p.profession === options.profession);
        }

        // ソート（デフォルトは新しい順）
        participants.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        // ページネーション
        const page = options.page || 1;
        const limit = options.limit || 50;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return {
            data: participants.slice(startIndex, endIndex),
            total: participants.length,
            page,
            limit,
            totalPages: Math.ceil(participants.length / limit)
        };
    }

    async getParticipantById(id) {
        const db = await this.readDatabase();
        return db.participants.find(p => p.id === id);
    }

    async updateParticipant(id, updates) {
        const db = await this.readDatabase();
        const index = db.participants.findIndex(p => p.id === id);
        
        if (index === -1) {
            throw new Error('参加者が見つかりません');
        }

        db.participants[index] = {
            ...db.participants[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        await this.writeDatabase(db);
        
        return db.participants[index];
    }

    async deleteParticipant(id) {
        const db = await this.readDatabase();
        const index = db.participants.findIndex(p => p.id === id);
        
        if (index === -1) {
            throw new Error('参加者が見つかりません');
        }

        const deleted = db.participants.splice(index, 1)[0];
        db.metadata.totalCount = db.participants.length;
        
        await this.writeDatabase(db);
        
        return deleted;
    }

    async getStatistics() {
        const db = await this.readDatabase();
        
        const stats = {
            total: db.participants.length,
            byStatus: {},
            byProfession: {},
            byMonth: {},
            recentSignups: []
        };

        // ステータス別集計
        db.participants.forEach(p => {
            stats.byStatus[p.status] = (stats.byStatus[p.status] || 0) + 1;
            stats.byProfession[p.profession] = (stats.byProfession[p.profession] || 0) + 1;
            
            // 月別集計
            const month = new Date(p.createdAt).toISOString().slice(0, 7);
            stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;
        });

        // 最近の登録者（最新10件）
        stats.recentSignups = db.participants
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10)
            .map(p => ({
                id: p.id,
                name: p.name,
                profession: p.profession,
                createdAt: p.createdAt
            }));

        return stats;
    }

    async exportToCSV() {
        const db = await this.readDatabase();
        
        const headers = [
            'ID',
            '名前',
            'メールアドレス',
            '職種',
            '経験年数',
            '参加動機',
            'ポートフォリオURL',
            'ニュースレター',
            'ステータス',
            '登録日時'
        ];

        const rows = db.participants.map(p => [
            p.id,
            p.name,
            p.email,
            p.profession,
            p.experience || '',
            p.motivation,
            p.portfolio || '',
            p.newsletter ? 'はい' : 'いいえ',
            p.status,
            p.createdAt
        ]);

        const csv = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        return csv;
    }
}

module.exports = new Database();