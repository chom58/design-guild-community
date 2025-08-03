/**
 * イベントカレンダー JavaScript
 */

// イベントデータ（実際はAPIから取得）
const eventsData = [
    {
        id: 1,
        title: 'リミックス・ワークショップ',
        type: 'workshop',
        typeLabel: 'ワークショップ',
        date: '2024-08-10',
        time: '14:00-17:00',
        location: '渋谷クリエイティブスペース',
        capacity: 20,
        description: '参加者が持ち寄った作品を他分野のクリエイターがリミックス。グラフィックをインタラクティブに、ファッションをデータビジュアライゼーションに。新しい表現の可能性を探ります。',
        features: ['作品の相互リミックス', '異分野の視点']
    },
    {
        id: 2,
        title: 'クリエイティブ・ランチ会',
        type: 'meetup',
        typeLabel: 'ランチ会',
        date: '2024-08-15',
        time: '12:00-13:30',
        location: '恵比寿カフェ',
        capacity: 8,
        description: 'カジュアルなランチタイムに少人数で集まり、「AIとクリエイティブ」をテーマにアイデア交換。',
        features: ['リラックスした雰囲気', '深いディスカッション']
    },
    {
        id: 3,
        title: 'ポートフォリオ・ナイト',
        type: 'presentation',
        typeLabel: 'プレゼン',
        date: '2024-08-22',
        time: '19:00-21:00',
        location: 'オンライン',
        capacity: 50,
        description: '異分野のクリエイター8名が各5分で作品を紹介。プレゼン後は投票で「コラボしたい人」を選出。',
        features: ['ライトニングトーク', 'マッチング投票']
    },
    {
        id: 4,
        title: '実験室セッション：音×ビジュアル',
        type: 'experimental',
        typeLabel: '実験',
        date: '2024-08-28',
        time: '18:00-20:00',
        location: '新宿スタジオ',
        capacity: 15,
        description: '音とビジュアルの新しい関係性を探る実験的ワークショップ。',
        features: ['実験的アプローチ', '新しい組み合わせ']
    },
    {
        id: 5,
        title: 'Design Guild 月次交流会',
        type: 'meetup',
        typeLabel: '交流会',
        date: '2024-09-05',
        time: '19:00-21:00',
        location: '表参道イベントスペース',
        capacity: 30,
        description: '毎月第一水曜日に開催する定例交流会。新メンバーの紹介とネットワーキング。',
        features: ['定例イベント', 'ネットワーキング']
    }
];

// グローバル変数
let currentDate = new Date();
let currentView = 'month';

// DOM要素
const elements = {
    currentMonth: document.getElementById('currentMonth'),
    calendarDays: document.getElementById('calendarDays'),
    eventsList: document.getElementById('eventsList'),
    monthView: document.getElementById('monthView'),
    listView: document.getElementById('listView'),
    eventModal: document.getElementById('eventModal'),
    eventModalContent: document.getElementById('eventModalContent')
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    initializeCalendar();
    
    // イベントリスナー
    document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
    
    // ビュー切り替え
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchView(e.target.dataset.view));
    });
    
    // モーダル閉じる
    document.querySelector('.modal-close').addEventListener('click', closeEventModal);
    window.addEventListener('click', (e) => {
        if (e.target === elements.eventModal) {
            closeEventModal();
        }
    });
});

// カレンダー初期化
function initializeCalendar() {
    updateMonthDisplay();
    if (currentView === 'month') {
        renderMonthView();
    } else {
        renderListView();
    }
}

// 月表示更新
function updateMonthDisplay() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    elements.currentMonth.textContent = `${year}年${month + 1}月`;
}

// 月変更
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    updateMonthDisplay();
    if (currentView === 'month') {
        renderMonthView();
    } else {
        renderListView();
    }
}

// ビュー切り替え
function switchView(view) {
    currentView = view;
    
    // ボタンのアクティブ状態更新
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // ビューの表示切り替え
    elements.monthView.classList.toggle('active', view === 'month');
    elements.listView.classList.toggle('active', view === 'list');
    
    // レンダリング
    if (view === 'month') {
        renderMonthView();
    } else {
        renderListView();
    }
}

// 月表示レンダリング
function renderMonthView() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const startDate = firstDay.getDay();
    const endDate = lastDay.getDate();
    const prevEndDate = prevLastDay.getDate();
    
    let html = '';
    let date = 1;
    
    // 6週間分のグリッドを生成
    for (let week = 0; week < 6; week++) {
        for (let day = 0; day < 7; day++) {
            const cellIndex = week * 7 + day;
            
            if (cellIndex < startDate) {
                // 前月の日付
                const prevDate = prevEndDate - startDate + cellIndex + 1;
                html += createDayCell(prevDate, 'other-month', new Date(year, month - 1, prevDate));
            } else if (date > endDate) {
                // 翌月の日付
                const nextDate = date - endDate;
                html += createDayCell(nextDate, 'other-month', new Date(year, month + 1, nextDate));
                date++;
            } else {
                // 当月の日付
                const currentDateObj = new Date(year, month, date);
                const isToday = isDateToday(currentDateObj);
                html += createDayCell(date, isToday ? 'today' : '', currentDateObj);
                date++;
            }
        }
    }
    
    elements.calendarDays.innerHTML = html;
}

// 日付セル作成
function createDayCell(date, className, dateObj) {
    const events = getEventsForDate(dateObj);
    const eventsHtml = events.slice(0, 3).map(event => 
        `<div class="event-dot event-${event.type}" onclick="showEventDetail(${event.id})">${event.title}</div>`
    ).join('');
    
    return `
        <div class="calendar-day ${className}" data-date="${dateObj.toISOString()}">
            <div class="day-number">${date}</div>
            <div class="day-events">${eventsHtml}</div>
        </div>
    `;
}

// 特定日付のイベント取得
function getEventsForDate(date) {
    const dateStr = date.toISOString().split('T')[0];
    return eventsData.filter(event => event.date === dateStr);
}

// 今日かどうか判定
function isDateToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

// リスト表示レンダリング
function renderListView() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 当月のイベントをフィルタリング
    const monthEvents = eventsData.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (monthEvents.length === 0) {
        elements.eventsList.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                今月のイベントはありません
            </div>
        `;
        return;
    }
    
    elements.eventsList.innerHTML = monthEvents.map(event => {
        const date = new Date(event.date);
        const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
        
        return `
            <div class="event-list-item" onclick="showEventDetail(${event.id})">
                <div class="event-date-block">
                    <div class="event-month">${date.getMonth() + 1}月</div>
                    <div class="event-day">${date.getDate()}</div>
                    <div class="event-weekday">${weekdays[date.getDay()]}</div>
                </div>
                <div class="event-info">
                    <span class="event-type event-${event.type}">${event.typeLabel}</span>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                </div>
                <div class="event-time">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    ${event.time}
                </div>
            </div>
        `;
    }).join('');
}

// イベント詳細表示
function showEventDetail(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;
    
    const date = new Date(event.date);
    const weekdays = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    
    elements.eventModalContent.innerHTML = `
        <div class="event-modal-header">
            <span class="event-modal-type event-${event.type}">${event.typeLabel}</span>
            <h2 class="event-modal-title">${event.title}</h2>
            <p class="event-modal-date">
                ${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${weekdays[date.getDay()]}）
            </p>
        </div>
        
        <div class="event-modal-body">
            <p class="event-modal-description">${event.description}</p>
            
            <div class="event-details">
                <div class="event-detail-item">
                    <span class="event-detail-label">時間</span>
                    <span class="event-detail-value">${event.time}</span>
                </div>
                <div class="event-detail-item">
                    <span class="event-detail-label">場所</span>
                    <span class="event-detail-value">${event.location}</span>
                </div>
                <div class="event-detail-item">
                    <span class="event-detail-label">定員</span>
                    <span class="event-detail-value">${event.capacity}名</span>
                </div>
            </div>
            
            <div class="event-features">
                ${event.features.map(feature => 
                    `<span class="feature-tag">${feature}</span>`
                ).join('')}
            </div>
        </div>
        
        <div class="event-modal-actions">
            <button class="neon-button" onclick="showJoinModal()">
                <span>参加申し込み</span>
            </button>
            <button class="neon-button secondary" onclick="closeEventModal()">
                <span>閉じる</span>
            </button>
        </div>
    `;
    
    elements.eventModal.style.display = 'block';
    elements.eventModal.setAttribute('aria-hidden', 'false');
}

// イベントモーダルを閉じる
function closeEventModal() {
    elements.eventModal.style.display = 'none';
    elements.eventModal.setAttribute('aria-hidden', 'true');
}

// 参加申し込みモーダル（簡易版）
function showJoinModal() {
    alert('参加申し込み機能は準備中です。\nお問い合わせ: hello@design-guild.jp');
}

function closeJoinModal() {
    // メインページの機能を使用
}