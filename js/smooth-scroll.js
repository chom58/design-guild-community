/**
 * スムーススクロール機能
 * アンカーリンクのスムーズな移動を実装
 */

document.addEventListener('DOMContentLoaded', function() {
    // すべてのアンカーリンクを取得
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // #のみの場合はスキップ
            if (href === '#') return;
            
            // ターゲット要素を取得
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // ヘッダーの高さを考慮
                const header = document.querySelector('.nav-futuristic');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // スムーススクロール実行
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューが開いている場合は閉じる
                const hamburger = document.getElementById('hamburgerMenu');
                const navItems = document.getElementById('navItems');
                if (hamburger && navItems && navItems.classList.contains('active')) {
                    navItems.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.classList.remove('active');
                }
                
                // フォーカス管理（アクセシビリティ）
                setTimeout(() => {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }, 500);
            }
        });
    });
    
    // ページ内リンクからのアクセス時の処理
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const header = document.querySelector('.nav-futuristic');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// スクロール位置に応じたナビゲーションのアクティブ状態管理
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${currentSection}` || (href === 'index.html' && currentSection === '')) {
            link.classList.add('active');
        }
    });
}

// スクロール時のイベントリスナー
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
            scrollTimeout = null;
        }, 100);
    }
});

// 初期状態の設定
updateActiveNavLink();