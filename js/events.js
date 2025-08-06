/**
 * イベントカレンダー JavaScript
 */

// イベントデータを格納する変数
let eventsData = [];

// グローバル変数
let currentDate = new Date();
let currentView = 'list';

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
document.addEventListener('DOMContentLoaded', async () => {
    // イベントデータを読み込む
    await loadEvents();
    
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

// イベントデータを読み込む
async function loadEvents() {
    try {
        const response = await fetch('data/events.json');
        const data = await response.json();
        eventsData = data.events || [];
    } catch (error) {
        console.error('イベントデータの読み込みに失敗しました:', error);
        // フォールバック用のデフォルトデータ
        eventsData = [];
    }
}

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
    // ローカル時間での日付文字列を作成（タイムゾーンの影響を避ける）
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    const matchedEvents = eventsData.filter(event => {
        const matches = event.date === dateStr;
        return matches;
    });
    
    return matchedEvents;
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
        // event.dateは "YYYY-MM-DD" 形式の文字列
        const [eventYear, eventMonth, eventDay] = event.date.split('-').map(Number);
        return eventYear === year && (eventMonth - 1) === month;
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
        // タイムゾーンの問題を避けるため、直接文字列から日付情報を取得
        const [eventYear, eventMonth, eventDay] = event.date.split('-').map(Number);
        const date = new Date(eventYear, eventMonth - 1, eventDay);
        const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
        
        return `
            <div class="event-list-item" onclick="showEventDetail(${event.id})">
                <div class="event-date-block">
                    <div class="event-month">${eventMonth}月</div>
                    <div class="event-day">${eventDay}</div>
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
    
    // タイムゾーンの問題を避けるため、直接文字列から日付情報を取得
    const [eventYear, eventMonth, eventDay] = event.date.split('-').map(Number);
    const date = new Date(eventYear, eventMonth - 1, eventDay);
    const weekdays = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    
    elements.eventModalContent.innerHTML = `
        <div class="event-modal-header">
            <span class="event-modal-type event-${event.type}">${event.typeLabel}</span>
            <h2 class="event-modal-title">${event.title}</h2>
            <p class="event-modal-date">
                ${eventYear}年${eventMonth}月${eventDay}日（${weekdays[date.getDay()]}）
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
            ${event.registrationOpen ? `
                <a href="mailto:hello@design-guild.jp?subject=${encodeURIComponent(event.mailSubject)}&body=${encodeURIComponent(event.mailBody)}" 
                   class="neon-button mail-button">
                    <span>参加申し込み</span>
                </a>
            ` : `
                <button class="neon-button" disabled>
                    <span>受付終了</span>
                </button>
            `}
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

// 参加申し込みモーダル
function showJoinModal() {
    const modal = document.getElementById('joinModal');
    if (modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeJoinModal() {
    const modal = document.getElementById('joinModal');
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // フォームをリセット
        const form = document.getElementById('joinForm');
        const formSuccess = document.getElementById('formSuccess');
        if (form) form.style.display = 'block';
        if (formSuccess) formSuccess.style.display = 'none';
        if (form) form.reset();
    }
}

// フォーム送信処理
document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.getElementById('joinForm');
    const professionSelect = document.getElementById('profession');
    const otherProfessionGroup = document.getElementById('otherProfessionGroup');
    
    // 職種選択時の処理
    if (professionSelect) {
        professionSelect.addEventListener('change', (e) => {
            if (e.target.value === 'other') {
                otherProfessionGroup.style.display = 'block';
                document.getElementById('otherProfession').required = true;
            } else {
                otherProfessionGroup.style.display = 'none';
                document.getElementById('otherProfession').required = false;
            }
        });
    }
    
    // フォーム送信処理
    if (joinForm) {
        joinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(joinForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                profession: formData.get('profession') === 'other' 
                    ? formData.get('otherProfession') 
                    : formData.get('profession'),
                experience: formData.get('experience'),
                motivation: formData.get('motivation'),
                portfolio: formData.get('portfolio'),
                newsletter: formData.get('newsletter') === 'on'
            };
            
            // メールで送信（mailto）
            const mailSubject = 'Design Guild 参加申込';
            const mailBody = `
Design Guild 参加申込

【お名前】${data.name}
【メールアドレス】${data.email}
【職種・専門分野】${data.profession}
【経験年数】${data.experience || '未回答'}
【参加動機・期待すること】
${data.motivation}
【ポートフォリオURL】${data.portfolio || 'なし'}
【ニュースレター】${data.newsletter ? '希望する' : '希望しない'}

※このメールは自動生成されています。
            `.trim();
            
            // メールリンクを開く
            const mailtoLink = `mailto:hello@design-guild.jp?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
            window.location.href = mailtoLink;
            
            // 成功メッセージを表示
            setTimeout(() => {
                joinForm.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
            }, 1000);
        });
    }
    
    // モーダル外クリックで閉じる
    const joinModal = document.getElementById('joinModal');
    if (joinModal) {
        joinModal.addEventListener('click', (e) => {
            if (e.target === joinModal) {
                closeJoinModal();
            }
        });
    }
});