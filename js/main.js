/**
 * デザインギルド - メインJavaScript
 */

// DOM要素の取得
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
    setTimeout(() => {
        elements.loading.classList.add('fade-out');
        initAnimations();
    }, 1000);
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
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
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

// パーティクルアニメーション開始（デスクトップのみ）
if (window.innerWidth > 768) {
    animateParticles();
}

// ===================================
// Google Forms連携 - フォーム送信処理
// ===================================
async function submitToGoogleForms(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // ボタンを無効化
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>送信中...</span>';
    
    // フォームデータを取得
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        profession: formData.get('profession') === 'other' 
            ? formData.get('otherProfession') 
            : formData.get('profession'),
        experience: formData.get('experience'),
        motivation: formData.get('motivation'),
        portfolio: formData.get('portfolio')
    };
    
    // Google Forms用のURL
    const FORM_ID = '1FAIpQLSe8b_ynVU1_TqQuoV472_eVFScWgj2WWaeRWFZDmKjkIKQi7Q';
    const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
    
    // エントリーIDのマッピング（Google Formsのフィールドに対応）
    const params = new URLSearchParams({
        'entry.2019842798': data.name,       // お名前
        'entry.61724704': data.email,        // メールアドレス  
        'entry.966592544': data.profession,  // 職種・専門分野
        'entry.1896235522': data.experience || '', // 経験年数
        'entry.505500388': data.motivation,  // 応募動機（要確認）
        'entry.123456789': data.portfolio || '' // ポートフォリオURL（要確認）
    });
    
    try {
        // デバッグ用ログ
        console.log('Design Guild - フォーム送信:', data);
        
        // iframe経由で送信（CORS回避）
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'hidden_iframe_' + Date.now();
        document.body.appendChild(iframe);
        
        // フォームを作成して送信
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = url;
        tempForm.target = iframe.name;
        
        // パラメータを追加
        params.forEach((value, key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            tempForm.appendChild(input);
        });
        
        document.body.appendChild(tempForm);
        tempForm.submit();
        
        // 成功処理
        setTimeout(() => {
            document.body.removeChild(iframe);
            document.body.removeChild(tempForm);
            
            // 既存の成功メッセージ表示
            form.style.display = 'none';
            const successDiv = document.getElementById('formSuccess');
            if (successDiv) {
                successDiv.style.display = 'block';
            }
            
            // 3秒後にモーダルを閉じる
            setTimeout(() => {
                const modal = document.getElementById('joinModal');
                if (modal) {
                    modal.style.display = 'none';
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
        }, 2000);
        
    } catch (error) {
        console.error('送信エラー:', error);
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        alert('送信に失敗しました。もう一度お試しください。');
    }
}

// モーダルを閉じる関数
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // フォームをリセット
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
            form.style.display = 'block';
            const successDiv = modal.querySelector('.form-success, .success-message');
            if (successDiv) {
                successDiv.style.display = 'none';
            }
        }
    }
}

// グローバルスコープに公開（onclick属性で使用するため）
window.closeModal = closeModal;

// フォームイベントの設定
document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.getElementById('joinForm');
    
    if (joinForm) {
        // 既存のイベントリスナーをクリア
        const newForm = joinForm.cloneNode(true);
        joinForm.parentNode.replaceChild(newForm, joinForm);
        
        // Google Forms送信を設定
        newForm.addEventListener('submit', submitToGoogleForms);
        
        console.log('Design Guild - Google Forms連携が有効化されました');
    }
});

// ===================================
// ページ離脱時の処理
// ===================================
window.addEventListener('beforeunload', () => {
    // パーティクルのクリーンアップ
    particles.forEach(particle => particle.element.remove());
});