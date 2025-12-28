// Main Application Script

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Update auth UI
    updateAuthUI();

    // Setup event listeners for homepage
    setupHomePage();
});

function setupHomePage() {
    // Only run on home page
    if (!document.getElementById('videosGrid')) return;

    // Load initial videos
    loadVideos();

    // Setup category filter
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Load videos by category
            const category = btn.getAttribute('data-category');
            currentFilters = category === 'all' ? {} : { category };
            loadVideos(currentFilters);
        });
    });

    // Setup search
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query) {
        currentFilters = { search: query };
        loadVideos(currentFilters);
    } else {
        currentFilters = {};
        loadVideos();
    }
}

// Utility: Format duration (seconds to mm:ss)
function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Utility: Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
