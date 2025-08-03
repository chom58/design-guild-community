/**
 * メール送信サービス
 * Nodemailerを使用したメール通知
 */

const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;

class EmailService {
    constructor() {
        this.transporter = null;
        this.initTransporter();
    }

    initTransporter() {
        if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
            console.warn('⚠️  メール設定が見つかりません。メール送信は無効です。');
            return;
        }

        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // 接続テスト
        this.transporter.verify((error, success) => {
            if (error) {
                console.error('❌ メールサーバー接続エラー:', error);
            } else {
                console.log('✅ メールサーバーに接続しました');
            }
        });
    }

    async loadTemplate(templateName, data) {
        const templatePath = path.join(__dirname, `../templates/email/${templateName}.html`);
        
        try {
            let template = await fs.readFile(templatePath, 'utf8');
            
            // テンプレート変数の置換
            Object.keys(data).forEach(key => {
                const regex = new RegExp(`{{${key}}}`, 'g');
                template = template.replace(regex, data[key]);
            });
            
            return template;
        } catch (error) {
            console.error('テンプレート読み込みエラー:', error);
            // フォールバックテンプレート
            return this.getDefaultTemplate(templateName, data);
        }
    }

    getDefaultTemplate(templateName, data) {
        const templates = {
            welcome: `
                <div style="font-family: 'Noto Sans JP', sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #0F172A; padding: 40px; text-align: center;">
                        <h1 style="color: #00D9FF; font-size: 32px; margin: 0;">Design Guild</h1>
                        <p style="color: #CBD5E1; margin: 10px 0 0;">混ざる、生まれる、未知なる表現</p>
                    </div>
                    <div style="padding: 40px; background: #F8FAFC;">
                        <h2 style="color: #0F172A; font-size: 24px;">ようこそ、${data.name}さん！</h2>
                        <p style="color: #475569; line-height: 1.8;">
                            Design Guildへの参加申し込みありがとうございます。<br>
                            あなたの創造性が、新しい化学反応を生み出すことを楽しみにしています。
                        </p>
                        
                        <div style="background: #E2E8F0; padding: 20px; border-radius: 8px; margin: 30px 0;">
                            <h3 style="color: #0F172A; font-size: 18px; margin: 0 0 10px;">登録情報</h3>
                            <p style="color: #475569; margin: 5px 0;">
                                <strong>職種:</strong> ${data.profession}<br>
                                <strong>経験年数:</strong> ${data.experience || '未記入'}<br>
                                <strong>ニュースレター:</strong> ${data.newsletter ? '受け取る' : '受け取らない'}
                            </p>
                        </div>
                        
                        <h3 style="color: #0F172A; font-size: 18px;">次のステップ</h3>
                        <ol style="color: #475569; line-height: 1.8;">
                            <li>運営チームがあなたの申し込みを確認します</li>
                            <li>承認後、Discordコミュニティへの招待リンクをお送りします</li>
                            <li>次回のイベント情報をメールでお知らせします</li>
                        </ol>
                        
                        <p style="color: #475569; margin-top: 30px;">
                            ご質問がございましたら、お気軽にお問い合わせください。<br>
                            <a href="mailto:hello@design-guild.jp" style="color: #00D9FF;">hello@design-guild.jp</a>
                        </p>
                    </div>
                    <div style="background: #1E293B; padding: 30px; text-align: center;">
                        <p style="color: #CBD5E1; margin: 0; font-size: 14px;">
                            © 2024 Design Guild. All rights reserved.
                        </p>
                    </div>
                </div>
            `,
            notification: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>新規参加申し込み</h2>
                    <p><strong>名前:</strong> ${data.name}</p>
                    <p><strong>メール:</strong> ${data.email}</p>
                    <p><strong>職種:</strong> ${data.profession}</p>
                    <p><strong>経験年数:</strong> ${data.experience || '未記入'}</p>
                    <p><strong>参加動機:</strong><br>${data.motivation}</p>
                    <p><strong>ポートフォリオ:</strong> ${data.portfolio || 'なし'}</p>
                    <p><strong>申込日時:</strong> ${new Date().toLocaleString('ja-JP')}</p>
                    <hr>
                    <p><a href="${process.env.ADMIN_URL || 'http://localhost:3000'}/admin">管理画面で確認</a></p>
                </div>
            `
        };

        return templates[templateName] || '<p>テンプレートが見つかりません</p>';
    }

    async sendWelcomeEmail(participantData) {
        if (!this.transporter) {
            console.log('📧 メール送信をスキップ（未設定）');
            return false;
        }

        try {
            const html = await this.loadTemplate('welcome', participantData);
            
            const mailOptions = {
                from: process.env.EMAIL_FROM || 'Design Guild <noreply@design-guild.jp>',
                to: participantData.email,
                subject: '【Design Guild】参加申し込みありがとうございます',
                html: html,
                text: this.htmlToText(html)
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('✅ ウェルカムメール送信完了:', info.messageId);
            return true;
        } catch (error) {
            console.error('❌ メール送信エラー:', error);
            return false;
        }
    }

    async sendAdminNotification(participantData) {
        if (!this.transporter || !process.env.ADMIN_EMAIL) {
            return false;
        }

        try {
            const html = await this.loadTemplate('notification', participantData);
            
            const mailOptions = {
                from: process.env.EMAIL_FROM || 'Design Guild <noreply@design-guild.jp>',
                to: process.env.ADMIN_EMAIL,
                subject: `【新規申込】${participantData.name}さん（${participantData.profession}）`,
                html: html,
                text: this.htmlToText(html)
            };

            await this.transporter.sendMail(mailOptions);
            console.log('✅ 管理者通知メール送信完了');
            return true;
        } catch (error) {
            console.error('❌ 管理者通知メール送信エラー:', error);
            return false;
        }
    }

    htmlToText(html) {
        // 簡易的なHTML→テキスト変換
        return html
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    async testConnection() {
        if (!this.transporter) {
            return { success: false, message: 'メール設定がありません' };
        }

        try {
            await this.transporter.verify();
            return { success: true, message: 'メールサーバー接続成功' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = new EmailService();