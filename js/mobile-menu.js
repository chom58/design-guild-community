/**
 * モバイルメニュー制御
 * タッチ操作最適化とアクセシビリティ対応
 */

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerMenu');
    const navItems = document.getElementById('navItems');
    const body = document.body;
    
    // オーバーレイ要素を作成
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
    
    // メニューの開閉制御
    function toggleMenu() {
        const isOpen = navItems.classList.contains('active');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // メニューを開く
    function openMenu() {
        hamburger.classList.add('active');
        navItems.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
        hamburger.setAttribute('aria-expanded', 'true');
        
        // フォーカストラップ
        navItems.querySelector('a, button').focus();
        
        // ESCキーで閉じる
        document.addEventListener('keydown', handleEscKey);
    }
    
    // メニューを閉じる
    function closeMenu() {
        hamburger.classList.remove('active');
        navItems.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
        
        // ESCキーリスナーを削除
        document.removeEventListener('keydown', handleEscKey);
        
        // フォーカスを戻す
        hamburger.focus();
    }
    
    // ESCキー処理
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    }
    
    // ハンバーガーメニューのクリック
    hamburger?.addEventListener('click', toggleMenu);
    
    // オーバーレイクリックで閉じる
    overlay.addEventListener('click', closeMenu);
    
    // メニュー内のリンククリックで閉じる
    const navLinks = navItems?.querySelectorAll('a');
    navLinks?.forEach(link => {
        link.addEventListener('click', () => {
            // 外部リンク以外は閉じる
            if (!link.hasAttribute('target')) {
                closeMenu();
            }
        });
    });
    
    // スワイプで閉じる（タッチデバイス対応）
    let touchStartX = 0;
    let touchEndX = 0;
    
    navItems?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    navItems?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        // 右スワイプで閉じる
        if (diff < -swipeThreshold) {
            closeMenu();
        }
    }
    
    // ウィンドウリサイズ時の処理
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        }, 250);
    });
    
    // フォーカストラップ実装
    navItems?.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableElements = navItems.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
});