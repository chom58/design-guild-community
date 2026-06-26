/**
 * 画像遅延読み込み
 * パフォーマンス最適化
 */

document.addEventListener('DOMContentLoaded', function() {
    // 遅延読み込み対象の画像を取得
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    
    // Intersection Observer の設定
    const imageObserverOptions = {
        root: null,
        rootMargin: '50px 0px',
        threshold: 0.01
    };
    
    // 画像読み込み関数
    function loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        // 画像をプリロード
        const tempImg = new Image();
        tempImg.onload = function() {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            
            // フェードインアニメーション
            requestAnimationFrame(() => {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease-in-out';
                requestAnimationFrame(() => {
                    img.style.opacity = '1';
                });
            });
        };
        tempImg.src = src;
    }
    
    // 背景画像読み込み関数
    function loadBackground(element) {
        const bg = element.getAttribute('data-bg');
        if (!bg) return;
        
        // 背景画像をプリロード
        const tempImg = new Image();
        tempImg.onload = function() {
            element.style.backgroundImage = `url(${bg})`;
            element.removeAttribute('data-bg');
            element.classList.add('bg-loaded');
        };
        tempImg.src = bg;
    }
    
    // Intersection Observer を作成
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.tagName === 'IMG') {
                    loadImage(element);
                } else {
                    loadBackground(element);
                }
                
                observer.unobserve(element);
            }
        });
    }, imageObserverOptions);
    
    // 対象要素を監視
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    lazyBackgrounds.forEach(element => {
        imageObserver.observe(element);
    });
    
    // Intersection Observer非対応ブラウザ用フォールバック
    if (!('IntersectionObserver' in window)) {
        lazyImages.forEach(img => {
            loadImage(img);
        });
        
        lazyBackgrounds.forEach(element => {
            loadBackground(element);
        });
    }
    
    // プリコネクトヒントを追加
    function addPreconnect(url) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        document.head.appendChild(link);
    }
    
    // 外部リソースへのプリコネクト
    addPreconnect('https://fonts.googleapis.com');
    addPreconnect('https://fonts.gstatic.com');
    addPreconnect('https://cdnjs.cloudflare.com');
});

// ネットワーク状態に応じた画質調整
if ('connection' in navigator) {
    const connection = navigator.connection;
    
    function adjustImageQuality() {
        const effectiveType = connection.effectiveType;
        const saveData = connection.saveData;
        
        // 低速接続または省データモードの場合
        if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
            document.body.classList.add('low-quality-mode');
            
            // 高解像度画像を低解像度に置換
            document.querySelectorAll('img[data-src-low]').forEach(img => {
                const lowSrc = img.getAttribute('data-src-low');
                img.setAttribute('data-src', lowSrc);
            });
        }
    }
    
    adjustImageQuality();
    connection.addEventListener('change', adjustImageQuality);
}