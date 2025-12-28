// Favorite Module

// Load user's favorites
async function loadFavorites() {
    const grid = document.getElementById('favoritesGrid');
    if (!grid) return;

    try {
        grid.innerHTML = '<div class="loading">載入中...</div>';
        const data = await apiGet('/favorites');

        if (data.success && data.data.length > 0) {
            grid.innerHTML = data.data.map(video => `
                <div class="video-card">
                    <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail" 
                        onclick="window.location.href='video-detail.html?id=${video._id}'">
                    <div class="video-info">
                        <h3 class="video-title">${video.title}</h3>
                        <div class="video-meta">
                            <span>⭐ ${video.rating}/10</span>
                            <span>👁 ${video.viewCount}</span>
                        </div>
                        <button class="btn btn-secondary" style="margin-top: 0.5rem; width: 100%;" 
                            onclick="removeFavorite('${video._id}')">移除收藏</button>
                    </div>
                </div>
            `).join('');
        } else {
            grid.innerHTML = '<p class="error">暫無收藏的影片</p>';
        }
    } catch (error) {
        grid.innerHTML = '<p class="error">載入收藏失敗</p>';
    }
}

// Add to favorites
async function addToFavorites(videoId) {
    try {
        const data = await apiPost('/favorites', { videoId });
        if (data.success) {
            alert('已加入收藏！');
        }
    } catch (error) {
        alert('加入收藏失敗: ' + error.message);
    }
}

// Remove from favorites
async function removeFavorite(videoId) {
    if (!confirm('確定要移除此收藏嗎？')) return;

    try {
        const data = await apiDelete(`/favorites/${videoId}`);
        if (data.success) {
            loadFavorites(); // Reload the list
        }
    } catch (error) {
        alert('移除收藏失敗');
    }
}
