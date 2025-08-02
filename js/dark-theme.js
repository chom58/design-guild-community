/**
 * デザインギルド - ダークテーマ JavaScript
 * WebGL背景、インタラクション、アニメーション制御
 */

// ===================================
// WebGL背景実装
// ===================================
class WebGLBackground {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('webgl-canvas'),
            alpha: true,
            antialias: true
        });
        
        this.particles = [];
        this.init();
    }
    
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        this.camera.position.z = 50;
        
        // パーティクルシステム
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        
        for (let i = 0; i < 1000; i++) {
            vertices.push(
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50
            );
            
            // ネオンカラーをランダムに割り当て
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors.push(0, 0.85, 1); // シアン
            } else if (colorChoice < 0.66) {
                colors.push(1, 0, 0.43); // マゼンタ
            } else {
                colors.push(1, 0.93, 0); // イエロー
            }
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8
        });
        
        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
        
        // 接続線の追加
        this.createConnections();
        
        this.animate();
        window.addEventListener('resize', () => this.onResize());
    }
    
    createConnections() {
        const positions = this.particleSystem.geometry.attributes.position.array;
        const connectionGeometry = new THREE.BufferGeometry();
        const connectionVertices = [];
        
        for (let i = 0; i < positions.length; i += 3) {
            for (let j = i + 3; j < positions.length; j += 3) {
                const distance = Math.sqrt(
                    Math.pow(positions[i] - positions[j], 2) +
                    Math.pow(positions[i + 1] - positions[j + 1], 2) +
                    Math.pow(positions[i + 2] - positions[j + 2], 2)
                );
                
                if (distance < 15 && Math.random() > 0.98) {
                    connectionVertices.push(
                        positions[i], positions[i + 1], positions[i + 2],
                        positions[j], positions[j + 1], positions[j + 2]
                    );
                }
            }
        }
        
        connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionVertices, 3));
        
        const connectionMaterial = new THREE.LineBasicMaterial({
            color: 0x00D9FF,
            opacity: 0.2,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        this.connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
        this.scene.add(this.connections);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.particleSystem.rotation.x += 0.0005;
        this.particleSystem.rotation.y += 0.001;
        
        if (this.connections) {
            this.connections.rotation.x += 0.0005;
            this.connections.rotation.y += 0.001;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// ===================================
// パララックスコラージュ
// ===================================
class ParallaxCollage {
    constructor() {
        this.layers = document.querySelectorAll('.collage-layer');
        this.items = document.querySelectorAll('.collage-item');
        this.init();
    }
    
    init() {
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.animateItems();
    }
    
    handleMouseMove(e) {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        this.layers.forEach((layer, index) => {
            const depth = layer.getAttribute('data-depth') || 0.5;
            const moveX = x * depth * 50;
            const moveY = y * depth * 50;
            
            layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    animateItems() {
        this.items.forEach((item, index) => {
            item.style.animation = `floatRandom ${10 + index * 2}s ease-in-out infinite`;
            item.style.animationDelay = `${index * 0.5}s`;
        });
    }
}

// ===================================
// 可変フォント制御
// ===================================
class VariableFont {
    constructor() {
        this.elements = document.querySelectorAll('.scroll-morph');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.handleScroll();
    }
    
    handleScroll() {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const weight = 100 + (scrollPercent * 800);
        
        this.elements.forEach(el => {
            el.style.setProperty('--font-weight', weight);
        });
    }
}

// ===================================
// カウンターアニメーション
// ===================================
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
}

// ===================================
// スキルレーダーチャート
// ===================================
class SkillRadar {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.skills = [
            { label: 'デザイン', value: 90 },
            { label: 'コーディング', value: 75 },
            { label: '3Dモデリング', value: 60 },
            { label: 'アニメーション', value: 85 },
            { label: 'データ分析', value: 70 },
            { label: 'UI/UX', value: 95 }
        ];
        
        this.init();
    }
    
    init() {
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = 100;
        
        this.draw();
    }
    
    draw() {
        const angleStep = (Math.PI * 2) / this.skills.length;
        
        // 背景の六角形を描画
        this.ctx.strokeStyle = '#334155';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < 5; i++) {
            this.ctx.beginPath();
            for (let j = 0; j < this.skills.length; j++) {
                const angle = j * angleStep - Math.PI / 2;
                const x = this.centerX + Math.cos(angle) * (this.radius * (i + 1) / 5);
                const y = this.centerY + Math.sin(angle) * (this.radius * (i + 1) / 5);
                
                if (j === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            this.ctx.stroke();
        }
        
        // スキルの値を描画
        this.ctx.fillStyle = 'rgba(0, 217, 255, 0.3)';
        this.ctx.strokeStyle = '#00D9FF';
        this.ctx.lineWidth = 2;
        
        this.ctx.beginPath();
        this.skills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const value = skill.value / 100;
            const x = this.centerX + Math.cos(angle) * (this.radius * value);
            const y = this.centerY + Math.sin(angle) * (this.radius * value);
            
            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
            
            // ポイントを描画
            this.ctx.fillStyle = '#00D9FF';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        this.ctx.closePath();
        this.ctx.fillStyle = 'rgba(0, 217, 255, 0.3)';
        this.ctx.fill();
        this.ctx.stroke();
        
        // ラベルを描画
        this.ctx.fillStyle = '#CBD5E1';
        this.ctx.font = '12px Inter';
        this.skills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = this.centerX + Math.cos(angle) * (this.radius + 20);
            const y = this.centerY + Math.sin(angle) * (this.radius + 20);
            
            this.ctx.textAlign = 'center';
            this.ctx.fillText(skill.label, x, y);
        });
    }
}

// ===================================
// 3Dカードインタラクション
// ===================================
class Card3D {
    constructor() {
        this.cards = document.querySelectorAll('.project-card-3d');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.handleMouseEnter(card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
        });
    }
    
    handleMouseEnter(card) {
        card.style.transition = 'none';
    }
    
    handleMouseLeave(card) {
        card.style.transition = 'transform 0.6s ease';
        card.style.transform = 'rotateY(0) rotateX(0)';
    }
    
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

// ===================================
// 初期化
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // WebGL背景
    if (document.getElementById('webgl-canvas')) {
        new WebGLBackground();
    }
    
    // パララックスコラージュ
    new ParallaxCollage();
    
    // 可変フォント
    new VariableFont();
    
    // カウンターアニメーション
    new CounterAnimation();
    
    // スキルレーダー
    new SkillRadar('skillRadar');
    
    // 3Dカード
    new Card3D();
    
    // ネオンボタンのリップルエフェクト
    document.querySelectorAll('.neon-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ===================================
// 運営メンバーモーダル
// ===================================
const organizerData = {
    chomu: {
        name: 'ちょむ',
        tagline: 'クリエイターにやたらと縁がある人',
        image: 'images/chomu.png',
        description: '美術コースの高校教師から、いつの間にかクリエイターのキャリア支援にどっぷりハマってしまった人です。クリエイターに特化した人材会社で美大生を救う新規サービスを立ち上げたり、アパレルデザイナーを応援する会社を作って失敗したりしています。現在はグローバルなコンサルティング会社で、ビジネスとクリエイティブを掛け合わせる新規事業に挑戦中です。',
        extra: '自身はクリエイターではないのに、義父が映像制作会社を経営していたり、なぜか周りにクリエイターが集まってきたりと、不思議な縁を感じています。趣味は、食べログ3.5以上の店をひたすら開拓するジロリアンです。'
    },
    nozawa: {
        name: '野澤',
        tagline: '雑誌の凄腕アートディレクター',
        image: 'images/nozawa.png',
        description: '武蔵野美術大学を卒業後、多くの有名雑誌のデザインを手がけていた木村裕治デザイン事務所に入社。『ミセス』や『婦人公論』、お洒落な『エスクァイア』など、数々の雑誌のリニューアルを経験し、その手腕を磨きました。',
        extra: 'その後、自身の事務所「Permanent Yellow Orange」を設立。現在は『Oggi』『VERY』『サンキュ！』といった人気雑誌から、『ひよこクラブ』『きょうの料理』まで、幅広いジャンルのアートディレクターとして活躍しています。Webデザインスクールに通ったり、産業カウンセラーの資格を取ったりと、常に新しい学びを続ける探究心も持ち合わせています。雑誌デザインにかけては右に出る者がいない?、明るく豪快な笑い声に定評があります。'
    }
};

function showOrganizerModal(organizerId) {
    const modal = document.getElementById('organizerModal');
    const modalContent = document.getElementById('modalContent');
    const data = organizerData[organizerId];
    
    if (data) {
        modalContent.innerHTML = `
            <div class="modal-organizer">
                <div class="modal-organizer-header">
                    <img src="${data.image}" alt="${data.name}" class="modal-organizer-image">
                    <div class="modal-organizer-title">
                        <h3>${data.name}</h3>
                        <p>${data.tagline}</p>
                    </div>
                </div>
                <div class="modal-organizer-body">
                    <p>${data.description}</p>
                    <p>${data.extra}</p>
                </div>
            </div>
        `;
        modal.style.display = 'block';
    }
}

function closeOrganizerModal() {
    const modal = document.getElementById('organizerModal');
    modal.style.display = 'none';
}

// モーダルの外側をクリックしたら閉じる
window.onclick = function(event) {
    const modal = document.getElementById('organizerModal');
    if (event.target == modal) {
        closeOrganizerModal();
    }
}

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeOrganizerModal();
        closeJoinModal();
    }
});

// ===================================
// 参加申し込みフォーム
// ===================================
function showJoinModal() {
    const modal = document.getElementById('joinModal');
    modal.style.display = 'block';
    // フォームをリセット
    document.getElementById('joinForm').reset();
    document.getElementById('joinForm').style.display = 'block';
    document.getElementById('formSuccess').style.display = 'none';
}

function closeJoinModal() {
    const modal = document.getElementById('joinModal');
    modal.style.display = 'none';
}

// フォームの送信処理
document.addEventListener('DOMContentLoaded', function() {
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        // 職種選択の変更を監視
        const professionSelect = document.getElementById('profession');
        const otherProfessionGroup = document.getElementById('otherProfessionGroup');
        
        professionSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherProfessionGroup.style.display = 'block';
                document.getElementById('otherProfession').required = true;
            } else {
                otherProfessionGroup.style.display = 'none';
                document.getElementById('otherProfession').required = false;
            }
        });
        
        // フォーム送信
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // フォームデータを収集
                const formData = new FormData(joinForm);
                const data = Object.fromEntries(formData);
                
                // ここで実際のAPIに送信する処理を実装
                console.log('フォームデータ:', data);
                
                // 送信ボタンを無効化
                const submitButton = joinForm.querySelector('.submit-button');
                submitButton.disabled = true;
                submitButton.innerHTML = '<span>送信中...</span>';
                
                // 送信成功をシミュレート（実際はAPIレスポンスを待つ）
                setTimeout(() => {
                    joinForm.style.display = 'none';
                    document.getElementById('formSuccess').style.display = 'block';
                }, 1500);
            }
        });
    }
});

// フォームバリデーション
function validateForm() {
    const form = document.getElementById('joinForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // エラーメッセージをクリア
    document.querySelectorAll('.form-error').forEach(error => error.remove());
    document.querySelectorAll('.form-group.error').forEach(group => {
        group.classList.remove('error');
    });
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, '必須項目です');
        }
    });
    
    // メールアドレスの検証
    const emailField = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailRegex.test(emailField.value)) {
        isValid = false;
        showFieldError(emailField, '有効なメールアドレスを入力してください');
    }
    
    // URLの検証（任意項目）
    const portfolioField = document.getElementById('portfolio');
    if (portfolioField.value) {
        try {
            new URL(portfolioField.value);
        } catch {
            isValid = false;
            showFieldError(portfolioField, '有効なURLを入力してください');
        }
    }
    
    return isValid;
}

// フィールドエラーを表示
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

// モーダルの外側をクリックで閉じる（参加申込用）
window.addEventListener('click', function(event) {
    const joinModal = document.getElementById('joinModal');
    if (event.target == joinModal) {
        closeJoinModal();
    }
});