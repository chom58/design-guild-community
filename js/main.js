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

// パーティクルアニメーション開始（パフォーマンス最適化のため無効化）
// 重いアニメーションが原因でエラーが発生しているため一時的に無効化
// if (window.innerWidth > 768) {
//     animateParticles();
// }

// ===================================
// フォーム送信処理（mailto方式 - 確実に動作）
async function submitToGoogleForms(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // ボタンを無効化
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>処理中...</span>';
    
    // フォームデータを取得
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        profession: formData.get('profession') === 'other' 
            ? formData.get('otherProfession') 
            : formData.get('profession'),
        experience: formData.get('experience') || '',
        motivation: formData.get('motivation'),
        portfolio: formData.get('portfolio') || ''
    };
    
    // メール本文を作成
    const subject = 'Design Guild 参加申込み';
    const body = `Design Guild 参加申込み

【お名前】${data.name}
【メールアドレス】${data.email}
【職種・専門分野】${data.profession}
【経験年数】${data.experience}
【参加動機・期待すること】
${data.motivation}
【ポートフォリオURL】${data.portfolio || 'なし'}

※このメールは自動生成されています。`;
    
    // mailtoリンクを開く
    const mailtoLink = `mailto:umigakikoeruyo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // メールクライアントを開く
    window.location.href = mailtoLink;
    
    // 成功メッセージを表示
    setTimeout(() => {
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
    }, 1000);
}

// フォームイベントの設定
document.addEventListener('DOMContentLoaded', () => {
    // URLパラメータをクリア（フォーム送信後のパラメータを削除）
    if (window.location.search) {
        // URLからパラメータを削除
        window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
    }
    
    const joinForm = document.getElementById('joinForm');
    
    if (joinForm) {
        // 既存のイベントリスナーをクリア
        const newForm = joinForm.cloneNode(true);
        joinForm.parentNode.replaceChild(newForm, joinForm);
        
        // mailto送信を設定
        newForm.addEventListener('submit', submitToGoogleForms);
        
        console.log('Design Guild - フォーム送信設定完了（mailto方式）');
    }
});

// ===================================
// ページ離脱時の処理
// ===================================
window.addEventListener('beforeunload', () => {
    // パーティクルのクリーンアップ
    particles.forEach(particle => particle.element.remove());
});