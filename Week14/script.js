// ==========================================
// Netflix 風格影音平台 - JavaScript 功能
// ==========================================

// DOM 元素快取
const searchBtn = document.getElementById('searchBtn');
const searchBox = document.getElementById('searchBox');
const searchClose = document.getElementById('searchClose');
const userMenuBtn = document.getElementById('userMenuBtn');
const navbar = document.querySelector('.navbar');
const carouselContainers = document.querySelectorAll('.carousel-container');

// ==========================================
// 搜尋功能
// ==========================================
function toggleSearch() {
    searchBox.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
        searchBox.querySelector('.search-input').focus();
    }
}

searchBtn.addEventListener('click', toggleSearch);
searchClose.addEventListener('click', toggleSearch);

// 點擊外部關閉搜尋框
document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target) && !searchBtn.contains(e.target)) {
        searchBox.classList.remove('active');
    }
});

// 搜尋輸入處理
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
        console.log('搜尋：', query);
        // 這裡可以實作即時搜尋功能
    }
});

// ==========================================
// 導航列滾動效果
// ==========================================
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
});

// ==========================================
// 輪播功能
// ==========================================
function initCarousels() {
    carouselContainers.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const navLeft = container.querySelector('.carousel-nav-left');
        const navRight = container.querySelector('.carousel-nav-right');

        if (!carousel || !navLeft || !navRight) return;

        // 獲取捲動距離
        function getScrollAmount() {
            const cardWidth = carousel.querySelector('.movie-card').offsetWidth;
            const gap = 8; // 0.5rem = 8px
            const visibleCards = Math.floor(carousel.offsetWidth / (cardWidth + gap));
            return (cardWidth + gap) * Math.max(1, visibleCards - 1);
        }

        // 向左捲動
        navLeft.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // 向右捲動
        navRight.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // 更新按鈕可見性
        function updateNavButtons() {
            const isAtStart = carousel.scrollLeft <= 10;
            const isAtEnd = carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth - 10;

            navLeft.style.opacity = isAtStart ? '0' : '';
            navRight.style.opacity = isAtEnd ? '0' : '';

            navLeft.style.pointerEvents = isAtStart ? 'none' : 'auto';
            navRight.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        }

        carousel.addEventListener('scroll', updateNavButtons);
        updateNavButtons();

        // 響應視窗大小變化
        window.addEventListener('resize', updateNavButtons);
    });
}

// 初始化輪播
initCarousels();

// ==========================================
// 影片卡片互動
// ==========================================
const movieCards = document.querySelectorAll('.movie-card');

movieCards.forEach(card => {
    let hoverTimeout;

    card.addEventListener('mouseenter', () => {
        // 延遲顯示詳細資訊（模擬 Netflix 的效果）
        hoverTimeout = setTimeout(() => {
            card.classList.add('hovering');
        }, 500);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        card.classList.remove('hovering');
    });

    // 點擊播放按鈕
    const playBtn = card.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = card.querySelector('.movie-title').textContent;
            console.log('播放影片：', title);
            alert(`正在播放：${title}`);
            // 這裡可以實作實際的播放功能
        });
    }

    // 點擊卡片
    card.addEventListener('click', () => {
        const title = card.querySelector('.movie-title')?.textContent || '未知影片';
        console.log('查看影片詳情：', title);
        // 這裡可以導航到影片詳情頁面
    });
});

// ==========================================
// 鍵盤導航支援
// ==========================================
document.addEventListener('keydown', (e) => {
    // ESC 關閉搜尋框
    if (e.key === 'Escape' && searchBox.classList.contains('active')) {
        toggleSearch();
    }

    // Ctrl+K 或 Cmd+K 開啟搜尋
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
});

// ==========================================
// 觸控裝置支援
// ==========================================
if ('ontouchstart' in window) {
    carouselContainers.forEach(container => {
        const carousel = container.querySelector('.carousel');
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('touchend', () => {
            isDown = false;
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
}

// ==========================================
// Intersection Observer - 延遲載入優化
// ==========================================
const imageObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // 這裡可以實作圖片延遲載入
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    },
    {
        rootMargin: '50px'
    }
);

// 觀察所有圖片
document.querySelectorAll('.movie-thumbnail img').forEach(img => {
    imageObserver.observe(img);
});

// ==========================================
// 效能優化：節流函數
// ==========================================
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// 應用節流到滾動事件
const throttledScroll = throttle(() => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('scroll', throttledScroll);

// ==========================================
// 控制台歡迎訊息
// ==========================================
console.log('%c🎬 Netflix 風格影音平台', 'color: #E50914; font-size: 20px; font-weight: bold;');
console.log('%c由 Antigravity AI 建立', 'color: #b3b3b3; font-size: 12px;');

// ==========================================
// 導出功能（供其他模組使用）
// ==========================================
window.NetflixApp = {
    toggleSearch,
    initCarousels,
    version: '1.0.0'
};
