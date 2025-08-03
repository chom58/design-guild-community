/**
 * 参加者統計の表示
 */

document.addEventListener('DOMContentLoaded', () => {
    // チャートのデフォルト設定
    Chart.defaults.color = '#CBD5E1';
    Chart.defaults.font.family = "'Inter', 'Noto Sans JP', sans-serif";
    
    // 年齢層チャート
    const ageCtx = document.getElementById('ageChart');
    if (ageCtx) {
        new Chart(ageCtx, {
            type: 'doughnut',
            data: {
                labels: ['20代', '30代', '40代', '50代以上'],
                datasets: [{
                    data: [30, 45, 20, 5],
                    backgroundColor: [
                        'rgba(0, 217, 255, 0.8)',
                        'rgba(255, 0, 110, 0.8)',
                        'rgba(255, 238, 0, 0.8)',
                        'rgba(0, 255, 136, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 職種分布チャート
    const jobCtx = document.getElementById('jobChart');
    if (jobCtx) {
        new Chart(jobCtx, {
            type: 'doughnut',
            data: {
                labels: ['Webデザイナー', 'グラフィック', 'エンジニア', 'その他'],
                datasets: [{
                    data: [35, 25, 25, 15],
                    backgroundColor: [
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(0, 217, 255, 0.8)',
                        'rgba(255, 0, 110, 0.8)',
                        'rgba(255, 238, 0, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 経験年数チャート
    const experienceCtx = document.getElementById('experienceChart');
    if (experienceCtx) {
        new Chart(experienceCtx, {
            type: 'doughnut',
            data: {
                labels: ['1-3年', '4-6年', '7-10年', '10年以上'],
                datasets: [{
                    data: [25, 35, 25, 15],
                    backgroundColor: [
                        'rgba(0, 255, 136, 0.8)',
                        'rgba(0, 217, 255, 0.8)',
                        'rgba(255, 238, 0, 0.8)',
                        'rgba(255, 0, 110, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // スクロールアニメーション
    const profileCards = document.querySelectorAll('.profile-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const profileObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    profileCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        profileObserver.observe(card);
    });
});