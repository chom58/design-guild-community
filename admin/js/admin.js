/**
 * Design Guild 管理画面 JavaScript
 */

// グローバル変数
let currentPage = 1;
let currentFilters = {
    status: '',
    profession: ''
};

// DOM要素
const elements = {
    loading: document.getElementById('loading'),
    totalCount: document.getElementById('totalCount'),
    pendingCount: document.getElementById('pendingCount'),
    approvedCount: document.getElementById('approvedCount'),
    thisMonthCount: document.getElementById('thisMonthCount'),
    statusFilter: document.getElementById('statusFilter'),
    professionFilter: document.getElementById('professionFilter'),
    participantsList: document.getElementById('participantsList'),
    pagination: document.getElementById('pagination'),
    exportBtn: document.getElementById('exportBtn'),
    refreshBtn: document.getElementById('refreshBtn'),
    detailModal: document.getElementById('detailModal'),
    modalBody: document.getElementById('modalBody')
};

// 初期化
document.addEventListener('DOMContentLoaded', async () => {
    await loadStatistics();
    await loadProfessions();
    await loadParticipants();
    
    // イベントリスナー設定
    elements.statusFilter.addEventListener('change', handleFilterChange);
    elements.professionFilter.addEventListener('change', handleFilterChange);
    elements.refreshBtn.addEventListener('click', refresh);
    elements.exportBtn.addEventListener('click', exportCSV);
    
    // モーダル関連
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === elements.detailModal) {
            closeModal();
        }
    });
    
    // ローディング非表示
    elements.loading.classList.add('hidden');
});

// 統計情報を読み込み
async function loadStatistics() {
    try {
        const response = await fetch('/api/admin/statistics');
        const data = await response.json();
        
        if (data.success) {
            const stats = data.data;
            elements.totalCount.textContent = stats.total;
            elements.pendingCount.textContent = stats.byStatus.pending || 0;
            elements.approvedCount.textContent = stats.byStatus.approved || 0;
            
            // 今月の申込数を計算
            const currentMonth = new Date().toISOString().slice(0, 7);
            elements.thisMonthCount.textContent = stats.byMonth[currentMonth] || 0;
        }
    } catch (error) {
        console.error('統計情報の読み込みエラー:', error);
    }
}

// 職種リストを読み込み
async function loadProfessions() {
    try {
        const response = await fetch('/api/professions');
        const data = await response.json();
        
        if (data.success) {
            elements.professionFilter.innerHTML = '<option value="">すべて</option>';
            data.data.forEach(profession => {
                const option = document.createElement('option');
                option.value = profession.value;
                option.textContent = profession.label;
                elements.professionFilter.appendChild(option);
            });
        }
    } catch (error) {
        console.error('職種リストの読み込みエラー:', error);
    }
}

// 参加者一覧を読み込み
async function loadParticipants() {
    try {
        showLoading();
        
        const params = new URLSearchParams({
            page: currentPage,
            limit: 20,
            ...currentFilters
        });
        
        const response = await fetch(`/api/admin/participants?${params}`);
        const data = await response.json();
        
        if (data.success) {
            renderParticipants(data.data);
            renderPagination(data);
        }
    } catch (error) {
        console.error('参加者一覧の読み込みエラー:', error);
        alert('データの読み込みに失敗しました');
    } finally {
        hideLoading();
    }
}

// 参加者一覧を描画
function renderParticipants(participants) {
    if (participants.length === 0) {
        elements.participantsList.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem;">
                    参加者が見つかりません
                </td>
            </tr>
        `;
        return;
    }
    
    elements.participantsList.innerHTML = participants.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${escapeHtml(p.name)}</td>
            <td>${escapeHtml(p.email)}</td>
            <td>${escapeHtml(p.profession)}</td>
            <td>
                <span class="status-badge status-${p.status}">
                    ${getStatusLabel(p.status)}
                </span>
            </td>
            <td>${formatDate(p.createdAt)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn" onclick="viewDetail('${p.id}')">詳細</button>
                    <button class="action-btn" onclick="updateStatus('${p.id}', 'approved')">承認</button>
                    <button class="action-btn" onclick="deleteParticipant('${p.id}')">削除</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ページネーションを描画
function renderPagination(data) {
    const { page, totalPages } = data;
    
    if (totalPages <= 1) {
        elements.pagination.innerHTML = '';
        return;
    }
    
    let buttons = [];
    
    // 前へボタン
    if (page > 1) {
        buttons.push(`<button class="page-btn" onclick="changePage(${page - 1})">前へ</button>`);
    }
    
    // ページ番号
    for (let i = 1; i <= totalPages; i++) {
        if (i === page) {
            buttons.push(`<button class="page-btn active">${i}</button>`);
        } else if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
            buttons.push(`<button class="page-btn" onclick="changePage(${i})">${i}</button>`);
        } else if (i === page - 3 || i === page + 3) {
            buttons.push('<span>...</span>');
        }
    }
    
    // 次へボタン
    if (page < totalPages) {
        buttons.push(`<button class="page-btn" onclick="changePage(${page + 1})">次へ</button>`);
    }
    
    elements.pagination.innerHTML = buttons.join('');
}

// 参加者詳細を表示
async function viewDetail(id) {
    try {
        const response = await fetch(`/api/admin/participants/${id}`);
        const data = await response.json();
        
        if (data.success) {
            const p = data.data;
            elements.modalBody.innerHTML = `
                <div class="detail-group">
                    <div class="detail-label">ID</div>
                    <div class="detail-value">${p.id}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">名前</div>
                    <div class="detail-value">${escapeHtml(p.name)}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">メールアドレス</div>
                    <div class="detail-value">
                        <a href="mailto:${p.email}">${escapeHtml(p.email)}</a>
                    </div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">職種</div>
                    <div class="detail-value">${escapeHtml(p.profession)}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">経験年数</div>
                    <div class="detail-value">${p.experience || '未記入'}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">参加動機</div>
                    <div class="detail-value" style="white-space: pre-wrap;">${escapeHtml(p.motivation)}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">ポートフォリオ</div>
                    <div class="detail-value">
                        ${p.portfolio ? `<a href="${p.portfolio}" target="_blank">${p.portfolio}</a>` : 'なし'}
                    </div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">ニュースレター</div>
                    <div class="detail-value">${p.newsletter ? '受け取る' : '受け取らない'}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">ステータス</div>
                    <div class="detail-value">
                        <span class="status-badge status-${p.status}">
                            ${getStatusLabel(p.status)}
                        </span>
                    </div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">申込日時</div>
                    <div class="detail-value">${formatDateTime(p.createdAt)}</div>
                </div>
            `;
            
            elements.detailModal.style.display = 'block';
        }
    } catch (error) {
        console.error('詳細情報の読み込みエラー:', error);
        alert('詳細情報の読み込みに失敗しました');
    }
}

// ステータス更新
async function updateStatus(id, status) {
    if (!confirm(`ステータスを「${getStatusLabel(status)}」に変更しますか？`)) {
        return;
    }
    
    try {
        const response = await fetch(`/api/admin/participants/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        
        const data = await response.json();
        
        if (data.success) {
            await refresh();
            alert('ステータスを更新しました');
        } else {
            alert('更新に失敗しました');
        }
    } catch (error) {
        console.error('ステータス更新エラー:', error);
        alert('更新に失敗しました');
    }
}

// 参加者削除
async function deleteParticipant(id) {
    if (!confirm('この参加者を削除しますか？この操作は取り消せません。')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/admin/participants/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            await refresh();
            alert('参加者を削除しました');
        } else {
            alert('削除に失敗しました');
        }
    } catch (error) {
        console.error('削除エラー:', error);
        alert('削除に失敗しました');
    }
}

// CSVエクスポート
async function exportCSV() {
    try {
        window.location.href = '/api/admin/export/csv';
    } catch (error) {
        console.error('エクスポートエラー:', error);
        alert('エクスポートに失敗しました');
    }
}

// フィルター変更
function handleFilterChange() {
    currentFilters.status = elements.statusFilter.value;
    currentFilters.profession = elements.professionFilter.value;
    currentPage = 1;
    loadParticipants();
}

// ページ変更
function changePage(page) {
    currentPage = page;
    loadParticipants();
}

// リフレッシュ
async function refresh() {
    await loadStatistics();
    await loadParticipants();
}

// モーダルを閉じる
function closeModal() {
    elements.detailModal.style.display = 'none';
}

// ローディング表示
function showLoading() {
    elements.loading.classList.remove('hidden');
}

// ローディング非表示
function hideLoading() {
    elements.loading.classList.add('hidden');
}

// ユーティリティ関数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getStatusLabel(status) {
    const labels = {
        pending: '承認待ち',
        approved: '承認済み',
        rejected: '却下'
    };
    return labels[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP');
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP');
}