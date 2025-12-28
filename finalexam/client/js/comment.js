// Comment Module

// Load comments for a video
async function loadComments(videoId) {
    const container = document.getElementById('commentsContainer');
    if (!container) return;

    try {
        const data = await apiGet(`/comments/video/${videoId}`, false);

        if (data.success) {
            const comments = data.data;
            const isLoggedIn = checkAuth();

            let html = '';

            // Comment form (if logged in)
            if (isLoggedIn) {
                html += `
                    <div class="comment-form">
                        <h4>發表評論</h4>
                        <form id="commentForm" onsubmit="submitComment(event, '${videoId}')">
                            <textarea id="commentContent" class="form-input" rows="3" 
                                placeholder="寫下您的評論..." required maxlength="500"></textarea>
                            <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">發送評論</button>
                        </form>
                    </div>
                `;
            }

            // Comments list
            if (comments.length > 0) {
                html += '<div class="comments-list">';
                comments.forEach(comment => {
                    html += `
                        <div class="comment-item">
                            <div class="comment-author">${comment.userId.username}</div>
                            <div class="comment-content">${comment.content}</div>
                            <div class="comment-meta">
                                <small>${new Date(comment.createdAt).toLocaleDateString('zh-TW')}</small>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
            } else {
                html += '<p class="no-comments">尚無評論</p>';
            }

            container.innerHTML = html;
        }
    } catch (error) {
        container.innerHTML = '<p class="error">載入評論失敗</p>';
    }
}

// Submit comment
async function submitComment(event, videoId) {
    event.preventDefault();

    const content = document.getElementById('commentContent').value;

    try {
        const data = await apiPost('/comments', { videoId, content });

        if (data.success) {
            // Reload comments
            loadComments(videoId);
            document.getElementById('commentContent').value = '';
        } else {
            alert('發送評論失敗');
        }
    } catch (error) {
        alert('發送評論時發生錯誤');
    }
}
