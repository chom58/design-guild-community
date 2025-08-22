/**
 * デザインギルド - メインJavaScript
 */

// DOM要素の取得（存在しない要素があってもエラーにならないように）
const elements = {
    loading: document.getElementById('loading'),
    navToggle: document.querySelector('.nav-toggle'),
    navMenu: document.querySelector('.nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    heroScroll: document.querySelector('.hero-scroll'),
    achievementNumbers: document.querySelectorAll('.achievement-number'),
    carouselTrack: document.querySelector('.carousel-track'),
    progressBar: document.querySelector('.progress-bar'),
    fadeInElements: document.querySelectorAll('.section-header, .challenge-card, .solution-slide, .member-card'),
    parallaxElements: document.querySelectorAll('[data-parallax]'),
    heroCircles: document.querySelector('.hero-circles g')
};

// ===================================
// ローディング画面の制御
// ===================================
window.addEventListener('load', () => {
    if (elements.loading) {
        setTimeout(() => {
            elements.loading.classList.add('fade-out');
            if (typeof initAnimations === 'function') {
                initAnimations();
            }
        }, 1000);
    }
});

// ===================================
// モバイルメニューの制御
// ===================================
elements.navToggle?.addEventListener('click', () => {
    const isActive = elements.navMenu.classList.contains('is-active');
    elements.navMenu.classList.toggle('is-active');
    elements.navToggle.setAttribute('aria-expanded', !isActive);
    
    // メニュートグルアニメーション
    const lines = elements.navToggle.querySelectorAll('.nav-toggle-line');
    if (!isActive) {
        lines[0].style.transform = 'rotate(45deg) translateY(10px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        lines[0].style.transform = '';
        lines[1].style.opacity = '';
        lines[2].style.transform = '';
    }
});

// メニューリンククリックでメニューを閉じる
elements.navLinks.forEach(link => {
    link.addEventListener('click', () => {
        elements.navMenu.classList.remove('is-active');
        elements.navToggle.setAttribute('aria-expanded', false);
    });
});

// ===================================
// スムーススクロール
// ===================================
elements.heroScroll?.addEventListener('click', () => {
    const nextSection = document.querySelector('.challenges');
    nextSection.scrollIntoView({ behavior: 'smooth' });
});

// ===================================
// Intersection Observer - フェードインアニメーション
// ===================================
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'is-visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// フェードイン要素の監視開始
elements.fadeInElements.forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
});

// ===================================
// カウンターアニメーション
// ===================================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseInt(target.getAttribute('data-count'));
            animateCounter(target, finalValue);
            counterObserver.unobserve(target);
        }
    });
}, {
    threshold: 0.5
});

elements.achievementNumbers.forEach(number => {
    counterObserver.observe(number);
});

function animateCounter(element, target) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ===================================
// パララックス効果
// ===================================
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    
    elements.parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax-speed') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// ===================================
// カルーセル制御
// ===================================
if (elements.carouselTrack && elements.progressBar) {
    elements.carouselTrack.addEventListener('scroll', () => {
        const scrollPercentage = (elements.carouselTrack.scrollLeft / 
            (elements.carouselTrack.scrollWidth - elements.carouselTrack.clientWidth)) * 100;
        
        // プログレスバーの更新
        elements.progressBar.style.width = `${Math.max(33.33, scrollPercentage)}%`;
    });
    
    // タッチスワイプのサポート
    let startX;
    let scrollLeft;
    
    elements.carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - elements.carouselTrack.offsetLeft;
        scrollLeft = elements.carouselTrack.scrollLeft;
    });
    
    elements.carouselTrack.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - elements.carouselTrack.offsetLeft;
        const walk = (x - startX) * 2;
        elements.carouselTrack.scrollLeft = scrollLeft - walk;
    });
}

// ===================================
// SVGアニメーション
// ===================================
function initAnimations() {
    // ヒーローセクションの円アニメーション
    if (elements.heroCircles) {
        createAnimatedCircles();
    }
    
    // ロゴアニメーション
    animateLogo();
}

function createAnimatedCircles() {
    const colors = ['#5B9BD5', '#7BB5E5', '#4A8BC5'];
    const numCircles = 5;
    
    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const cx = Math.random() * 100;
        const cy = Math.random() * 100;
        const r = Math.random() * 20 + 10;
        
        circle.setAttribute('cx', `${cx}%`);
        circle.setAttribute('cy', `${cy}%`);
        circle.setAttribute('r', `${r}%`);
        circle.setAttribute('fill', colors[i % colors.length]);
        circle.setAttribute('opacity', '0.3');
        
        // アニメーション
        const animateX = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateX.setAttribute('attributeName', 'cx');
        animateX.setAttribute('values', `${cx}%;${cx + 20}%;${cx}%`);
        animateX.setAttribute('dur', `${10 + i * 2}s`);
        animateX.setAttribute('repeatCount', 'indefinite');
        
        const animateY = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateY.setAttribute('attributeName', 'cy');
        animateY.setAttribute('values', `${cy}%;${cy - 15}%;${cy}%`);
        animateY.setAttribute('dur', `${8 + i * 1.5}s`);
        animateY.setAttribute('repeatCount', 'indefinite');
        
        const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateOpacity.setAttribute('attributeName', 'opacity');
        animateOpacity.setAttribute('values', '0.3;0.6;0.3');
        animateOpacity.setAttribute('dur', `${5 + i}s`);
        animateOpacity.setAttribute('repeatCount', 'indefinite');
        
        circle.appendChild(animateX);
        circle.appendChild(animateY);
        circle.appendChild(animateOpacity);
        
        elements.heroCircles.appendChild(circle);
    }
}

function animateLogo() {
    // ロゴアニメーションはSVG内部で実装済み
}

// ===================================
// ヘッダーのスクロール制御
// ===================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return; // ヘッダーが存在しない場合は処理をスキップ
    
    const currentScroll = window.pageYOffset;
    
    // スクロール方向の判定
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    // 背景の透明度調整
    if (currentScroll > 50) {
        header.style.background = 'rgba(250, 250, 250, 0.98)';
    } else {
        header.style.background = 'rgba(250, 250, 250, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// マウスカーソル追従パーティクル
// ===================================
let mouseX = 0;
let mouseY = 0;
let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = 1;
        this.element = document.createElement('div');
        this.element.className = 'particle';
        this.element.style.cssText = `
            position: fixed;
            width: ${this.size}px;
            height: ${this.size}px;
            background: #5B9BD5;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${this.x}px;
            top: ${this.y}px;
        `;
        document.body.appendChild(this.element);
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
        
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.opacity = this.opacity;
        
        if (this.opacity <= 0) {
            this.element.remove();
            return true;
        }
        return false;
    }
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (Math.random() > 0.9) {
        particles.push(new Particle(mouseX, mouseY));
    }
});

function animateParticles() {
    particles = particles.filter(particle => !particle.update());
    requestAnimationFrame(animateParticles);
}

// パーティクルアニメーション開始（パフォーマンス最適化のため無効化）
// 重いアニメーションが原因でエラーが発生しているため一時的に無効化
// if (window.innerWidth > 768) {
//     animateParticles();
// }

// ===================================
// Google Forms送信処理
// ===================================
async function submitToGoogleForms(event) {
    event.preventDefault();
    
    const form = document.getElementById('joinForm');
    const submitButton = document.getElementById('submitBtn');
    const originalText = submitButton.innerHTML;
    
    // バリデーション（dark-theme.jsの関数を使用）
    if (typeof validateForm === 'function' && !validateForm()) {
        return;
    }
    
    // ボタンを無効化
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>送信中...</span>';
    
    try {
        // フォームデータを取得
        const formData = new FormData(form);
        
        // 職種の処理
        let profession = formData.get('profession');
        if (profession === 'other') {
            profession = formData.get('otherProfession');
        }
        
        console.log('送信データ:', {
            name: formData.get('name'),
            email: formData.get('email'),
            profession: profession,
            experience: formData.get('experience'),
            motivation: formData.get('motivation'),
            portfolio: formData.get('portfolio')
        });
    
    // Google Apps Script経由で送信（CORS回避）
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbyQRFEjUsje4rDN-MT0MNivcj2MGCC71FiTh0qAqoFFFx74XyccuI0t1Npso7E85oo/exec';
    const FORM_ID = '1FAIpQLSe8b_ynVU1_TqQuoV472_eVFScWgj2WWaeRWFZDmKjkIKQi7Q'; // バックアップ用
    const FORM_URL = GAS_URL; // Google Apps Script経由で送信
    
    // エントリーIDとフォームフィールドのマッピング（正しいIDに更新済み）
    const entries = {
        'entry.1755098959': formData.get('name'),           // お名前(ニックネームでok)
        'entry.1593853110': formData.get('email'),          // メールアドレス
        'entry.1887838426': formData.get('lineId') || '',   // LINE ID
        'entry.966592544': profession,                      // 職種・専門分野
        'entry.1896235522': formData.get('experience') || '', // 経験年数
        'entry.505500388': formData.get('motivation'),      // 参加動機・期待すること
        'entry.1751089080': formData.get('portfolio') || ''  // ポートフォリオURL（任意）
    };
    
    // URLエンコードされたデータを準備
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(entries)) {
        if (value) {
            params.append(key, value);
        }
    }
    
    // Google Apps Script経由で送信（JSONデータとして）
    const jsonData = {
        name: formData.get('name'),
        email: formData.get('email'),
        lineId: formData.get('lineId') || '',
        profession: profession,
        experience: formData.get('experience') || '',
        motivation: formData.get('motivation'),
        portfolio: formData.get('portfolio') || ''
    };
    
    // fetch APIでGoogle Apps Scriptに送信
    fetch(FORM_URL, {
        method: 'POST',
        mode: 'cors', // Google Apps ScriptはCORSを許可
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
    }).then(response => response.json()).then(result => {
        console.log('GAS Response:', result);
        if (result.result === 'success') {
        console.log('フォーム送信完了');
        
        // 成功メッセージを表示
        form.style.display = 'none';
        let successDiv = document.getElementById('formSuccess');
        if (!successDiv) {
            // successDivが無い場合は新規作成
            successDiv = document.createElement('div');
            successDiv.id = 'formSuccess';
            successDiv.style.cssText = `
                text-align: center;
                padding: 40px 20px;
                background: #f0f9ff;
                border-radius: 8px;
                margin: 20px 0;
            `;
            successDiv.innerHTML = `
                <h3 style="color: #4CAF50; margin-bottom: 10px;">✓ 送信完了</h3>
                <p>参加申し込みを受け付けました。<br>確認メールをお送りしますので、しばらくお待ちください。</p>
            `;
            form.parentElement.appendChild(successDiv);
        }
        successDiv.style.display = 'block';
        
        // 3秒後にモーダルを閉じる（モーダルがある場合）
        setTimeout(() => {
            const modal = document.getElementById('joinModal');
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
            // フォームをリセット
            form.reset();
            form.style.display = 'block';
            if (successDiv) {
                successDiv.style.display = 'none';
            }
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }, 3000);
        } else {
            throw new Error(result.message || '送信に失敗しました');
        }
    }).catch((error) => {
        console.error('送信エラー:', error);
        
        // エラーメッセージを表示
        alert('送信中にエラーが発生しました。もう一度お試しください。\n\n' + error.message);
        
        // ボタンを元に戻す
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    });
    
    } catch (error) {
        console.error('送信エラー:', error);
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        alert('送信中にエラーが発生しました。もう一度お試しください。');
    }
}

// フォームイベントの設定
document.addEventListener('DOMContentLoaded', () => {
    // URLパラメータをクリア（フォーム送信後のパラメータを削除）
    if (window.location.search) {
        // URLからパラメータを削除
        window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
    }
    
    const joinForm = document.getElementById('joinForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (submitBtn && joinForm) {
        // ボタンクリックで送信処理を実行
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // フォームのsubmitイベントをエミュレート
            const event = new Event('submit', {
                bubbles: true,
                cancelable: true
            });
            event.target = joinForm;
            event.currentTarget = joinForm;
            submitToGoogleForms(event);
            return false;
        });
        
        // フォームのデフォルトsubmitを無効化
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        
        console.log('Design Guild - フォーム送信設定完了（Google Forms連携）');
    }
});

// ===================================
// ページ離脱時の処理
// ===================================
window.addEventListener('beforeunload', () => {
    // パーティクルのクリーンアップ
    particles.forEach(particle => particle.element.remove());
});