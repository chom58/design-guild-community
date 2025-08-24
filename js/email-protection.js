/**
 * メールアドレススパム対策
 * メールアドレスを動的に生成して表示
 */

document.addEventListener('DOMContentLoaded', function() {
    // メールアドレスを分割して保存（スパムボット対策）
    const emailParts = {
        user: 'umigakikoeruyo',
        domain: 'gmail',
        tld: 'com'
    };

    // メールアドレスを組み立てる関数
    function getEmail() {
        return `${emailParts.user}@${emailParts.domain}.${emailParts.tld}`;
    }

    // メールリンクを保護する
    const protectEmailLinks = () => {
        // data-email属性を持つ要素を取得
        const emailElements = document.querySelectorAll('[data-email]');
        
        emailElements.forEach(element => {
            const emailType = element.getAttribute('data-email');
            
            if (emailType === 'display') {
                // メールアドレスを表示
                element.textContent = getEmail();
            } else if (emailType === 'link') {
                // mailtoリンクを設定
                const email = getEmail();
                element.href = `mailto:${email}`;
                element.textContent = email;
                
                // クリック時の処理
                element.addEventListener('click', function() {
                    // 一時的にhrefを設定（すでに設定済みだが念のため）
                    this.href = `mailto:${email}`;
                });
            }
        });
    };

    // メールアドレスをコピーする機能
    const addCopyFunction = () => {
        const copyButtons = document.querySelectorAll('[data-copy-email]');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', async function() {
                const email = getEmail();
                
                try {
                    // クリップボードにコピー
                    await navigator.clipboard.writeText(email);
                    
                    // フィードバック表示
                    const originalText = this.textContent;
                    this.textContent = 'コピーしました！';
                    this.style.backgroundColor = '#4CAF50';
                    
                    // 2秒後に元に戻す
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.backgroundColor = '';
                    }, 2000);
                } catch (err) {
                    // フォールバック：テキストエリアを使用
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    
                    try {
                        // 非推奨のAPIだが、フォールバックとして使用
                        const result = document.execCommand('copy');
                        if (result) {
                            this.textContent = 'コピーしました！';
                            setTimeout(() => {
                                this.textContent = 'メールアドレスをコピー';
                            }, 2000);
                        }
                    } catch (err) {
                        console.error('コピーに失敗しました:', err);
                    }
                    
                    document.body.removeChild(textArea);
                }
            });
        });
    };

    // 難読化されたメールアドレスを表示（高度な保護）
    const obfuscateEmail = () => {
        const obfuscatedElements = document.querySelectorAll('[data-obfuscate]');
        
        obfuscatedElements.forEach(element => {
            // CSSで逆順に表示する方法
            const reversedEmail = getEmail().split('').reverse().join('');
            element.setAttribute('data-reversed', reversedEmail);
            element.style.unicodeBidi = 'bidi-override';
            element.style.direction = 'rtl';
            element.textContent = reversedEmail;
            
            // ホバー時に正しい向きで表示
            element.addEventListener('mouseenter', function() {
                this.style.direction = 'ltr';
                this.textContent = getEmail();
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.direction = 'rtl';
                this.textContent = reversedEmail;
            });
        });
    };

    // 初期化
    protectEmailLinks();
    addCopyFunction();
    obfuscateEmail();
});

// ハニーポット（スパムボット対策）
// 見えないフィールドを作成し、ボットが入力した場合は送信を防ぐ
function addHoneypot(formElement) {
    if (!formElement) return;
    
    // ハニーポットフィールドを作成
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website'; // ボットが入力しそうな名前
    honeypot.style.position = 'absolute';
    honeypot.style.left = '-9999px';
    honeypot.style.height = '0';
    honeypot.style.width = '0';
    honeypot.setAttribute('tabindex', '-1');
    honeypot.setAttribute('autocomplete', 'off');
    
    formElement.appendChild(honeypot);
    
    // フォーム送信時のチェック
    formElement.addEventListener('submit', function(e) {
        if (honeypot.value !== '') {
            // ハニーポットに値が入っている = ボット
            e.preventDefault();
            console.warn('Spam detected');
            return false;
        }
    });
}