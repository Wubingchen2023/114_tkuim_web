// Playlist Module

// Load user's playlists
async function loadPlaylists() {
    const container = document.getElementById('playlistsContainer');
    if (!container) return;

    try {
        container.innerHTML = '<div class="loading">載入中...</div>';
        const data = await apiGet('/playlists');

        if (data.success && data.data.length > 0) {
            container.innerHTML = data.data.map(playlist => `
                <div class="playlist-card">
                    <h3 class="playlist-name">${playlist.name}</h3>
                    <p class="playlist-info">${playlist.videos.length} 部影片</p>
                    ${playlist.description ? `<p class="playlist-description">${playlist.description}</p>` : ''}
                    <div class="playlist-actions" style="display: flex; gap: 1rem;">
                        <button class="btn btn-primary" onclick="viewPlaylist('${playlist._id}')">查看</button>
                        <button class="btn btn-secondary" onclick="deletePlaylist('${playlist._id}')">刪除</button>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p class="error">暫無播放清單</p>';
        }
    } catch (error) {
        container.innerHTML = '<p class="error">載入播放清單失敗</p>';
    }
}

// Create new playlist
async function createPlaylist(name, description = '') {
    try {
        const data = await apiPost('/playlists', { name, description });
        if (data.success) {
            alert('播放清單建立成功！');
            loadPlaylists();
        }
    } catch (error) {
        alert('建立播放清單失敗');
    }
}

// Delete playlist
async function deletePlaylist(playlistId) {
    if (!confirm('確定要刪除此播放清單嗎？')) return;

    try {
        const data = await apiDelete(`/playlists/${playlistId}`);
        if (data.success) {
            loadPlaylists();
        }
    } catch (error) {
        alert('刪除播放清單失敗');
    }
}

// View playlist details
async function viewPlaylist(playlistId) {
    try {
        const data = await apiGet(`/playlists/${playlistId}`);
        if (data.success) {
            const playlist = data.data;
            alert(`播放清單: ${playlist.name}\n影片數量: ${playlist.videos.length}`);
            // You could create a dedicated playlist detail page here
        }
    } catch (error) {
        alert('載入播放清單詳情失敗');
    }
}

// Add video to playlist
async function addVideoToPlaylist(playlistId, videoId) {
    try {
        const data = await apiPost(`/playlists/${playlistId}/videos`, { videoId });
        if (data.success) {
            alert('已加入播放清單！');
        }
    } catch (error) {
        alert('加入播放清單失敗');
    }
}
