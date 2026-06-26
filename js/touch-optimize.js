/**
 * タッチ操作最適化
 * モバイルUX向上
 */

document.addEventListener('DOMContentLoaded', function() {
    // タッチデバイス検出
    const isTouchDevice = ('ontouchstart' in window) || 
                         (navigator.maxTouchPoints > 0) || 
                         (navigator.msMaxTouchPoints > 0);
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    // カードフリップをタップに変更（タッチデバイス）
    if (isTouchDevice) {
        const flipCards = document.querySelectorAll('.project-card-3d');
        
        flipCards.forEach(card => {
            let isFlipped = false;
            
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const cardInner = this.querySelector('.card-inner');
                
                if (isFlipped) {
                    cardInner.style.transform = 'rotateY(0deg)';
                } else {
                    cardInner.style.transform = 'rotateY(180deg)';
                }
                
                isFlipped = !isFlipped;
            });
        });
    }
    
    // スワイプジェスチャー実装
    class SwipeDetector {
        constructor(element, options = {}) {
            this.element = element;
            this.options = {
                threshold: options.threshold || 50,
                restraint: options.restraint || 100,
                allowedTime: options.allowedTime || 300,
                ...options
            };
            
            this.touchStartX = 0;
            this.touchStartY = 0;
            this.touchEndX = 0;
            this.touchEndY = 0;
            this.touchStartTime = 0;
            
            this.init();
        }
        
        init() {
            this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        }
        
        handleTouchStart(e) {
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchStartY = e.changedTouches[0].screenY;
            this.touchStartTime = Date.now();
        }
        
        handleTouchEnd(e) {
            this.touchEndX = e.changedTouches[0].screenX;
            this.touchEndY = e.changedTouches[0].screenY;
            
            const elapsedTime = Date.now() - this.touchStartTime;
            
            if (elapsedTime <= this.options.allowedTime) {
                this.handleSwipe();
            }
        }
        
        handleSwipe() {
            const diffX = this.touchEndX - this.touchStartX;
            const diffY = this.touchEndY - this.touchStartY;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // 水平スワイプ
                if (Math.abs(diffX) > this.options.threshold && Math.abs(diffY) < this.options.restraint) {
                    if (diffX > 0) {
                        this.onSwipeRight();
                    } else {
                        this.onSwipeLeft();
                    }
                }
            } else {
                // 垂直スワイプ
                if (Math.abs(diffY) > this.options.threshold && Math.abs(diffX) < this.options.restraint) {
                    if (diffY > 0) {
                        this.onSwipeDown();
                    } else {
                        this.onSwipeUp();
                    }
                }
            }
        }
        
        onSwipeLeft() {
            if (this.options.onSwipeLeft) this.options.onSwipeLeft();
        }
        
        onSwipeRight() {
            if (this.options.onSwipeRight) this.options.onSwipeRight();
        }
        
        onSwipeUp() {
            if (this.options.onSwipeUp) this.options.onSwipeUp();
        }
        
        onSwipeDown() {
            if (this.options.onSwipeDown) this.options.onSwipeDown();
        }
    }
    
    // カルーセルのスワイプ対応
    const carousel = document.querySelector('.carousel-container');
    if (carousel && isTouchDevice) {
        new SwipeDetector(carousel, {
            onSwipeLeft: () => {
                // 次のスライドへ
                const nextBtn = carousel.querySelector('.carousel-next');
                if (nextBtn) nextBtn.click();
            },
            onSwipeRight: () => {
                // 前のスライドへ
                const prevBtn = carousel.querySelector('.carousel-prev');
                if (prevBtn) prevBtn.click();
            }
        });
    }
    
    // プルトゥリフレッシュ防止
    let lastY = 0;
    document.addEventListener('touchstart', function(e) {
        lastY = e.touches[0].clientY;
    }, { passive: false });
    
    document.addEventListener('touchmove', function(e) {
        const y = e.touches[0].clientY;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // ページトップでの上方向スワイプを防止
        if (scrollTop === 0 && y > lastY) {
            e.preventDefault();
        }
        
        lastY = y;
    }, { passive: false });
    
    // ダブルタップズーム防止
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // FastClick的な処理（タップ遅延除去）
    if (isTouchDevice) {
        const clickableElements = document.querySelectorAll('a, button, .clickable');
        
        clickableElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
    }
    
    // フォーカス時のスクロール防止（iOS対策）
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                setTimeout(() => {
                    window.scrollTo(0, window.pageYOffset);
                }, 0);
            });
        });
    }
});

// ビューポート高さ修正（モバイルブラウザ対応）
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);