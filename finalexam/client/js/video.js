// Video Module

// Get all videos with filters
async function getVideos(filters = {}) {
    const params = new URLSearchParams(filters);
    return await apiGet(`/videos?${params}`, false);
}

// Get video by ID
async function getVideoById(id) {
    return await apiGet(`/videos/${id}`, false);
}

// Create video card HTML
function createVideoCard(video) {
    return `
        <div class="video-card" onclick="window.location.href='video-detail.html?id=${video._id}'">
            <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">
                    <span>⭐ ${video.rating}/10</span>
                    <span>👁 ${video.viewCount}</span>
                </div>
                <p class="video-description">${video.description || ''}</p>
            </div>
        </div>
    `;
}

// Load and display videos
async function loadVideos(filters = {}) {
    const grid = document.getElementById('videosGrid');
    if (!grid) return;

    try {
        grid.innerHTML = '<div class="loading">載入中...</div>';
        const data = await getVideos(filters);

        if (data.success && data.data.videos.length > 0) {
            grid.innerHTML = data.data.videos.map(createVideoCard).join('');

            // Update pagination if exists
            const pagination = document.getElementById('pagination');
            if (pagination && data.data.pagination) {
                updatePagination(data.data.pagination, filters);
            }
        } else {
            grid.innerHTML = '<p class="error">暫無影片</p>';
        }
    } catch (error) {
        grid.innerHTML = '<p class="error">載入影片失敗</p>';
    }
}

// Update pagination
function updatePagination(pagination, currentFilters) {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;

    const { page, pages } = pagination;
    let html = '';

    if (page > 1) {
        html += `<button onclick="changePage(${page - 1})">上一頁</button>`;
    }

    html += `<span>第 ${page} / ${pages} 頁</span>`;

    if (page < pages) {
        html += `<button onclick="changePage(${page + 1})">下一頁</button>`;
    }

    paginationEl.innerHTML = html;
}

// Change page
let currentFilters = {};

function changePage(page) {
    currentFilters.page = page;
    loadVideos(currentFilters);
}

// Increment view count when video is viewed
async function incrementViewCount(videoId) {
    try {
        await apiPut(`/videos/${videoId}/view`, {}, false);
    } catch (error) {
        console.error('Failed to increment view count:', error);
    }
}
