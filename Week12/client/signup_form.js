// 設定報名表單
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('請先登入');
    return;
  }

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  try {
    const response = await fetch(`${API_BASE}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, email, phone, status: 'pending' })
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        alert('登入已過期，請重新登入');
        logout();
        return;
      }
      throw new Error(data.message || '報名失敗');
    }

    alert('報名成功！');
    document.getElementById('signupForm').reset();
    loadParticipants();

  } catch (error) {
    alert(`錯誤：${error.message}`);
  }
});

// 載入報名資料
async function loadParticipants() {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const response = await fetch(`${API_BASE}/api/signup`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        return;
      }
      throw new Error('載入失敗');
    }

    const { data } = await response.json();
    displayParticipants(data);

  } catch (error) {
    console.error('載入失敗:', error);
    document.getElementById('participantsList').innerHTML = 
      '<p class="text-danger">載入失敗，請稍後再試</p>';
  }
}

// 顯示報名資料
function displayParticipants(participants) {
  const container = document.getElementById('participantsList');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (participants.length === 0) {
    container.innerHTML = '<p class="text-muted">目前沒有報名資料</p>';
    return;
  }

  const html = `
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>姓名</th>
            <th>Email</th>
            <th>電話</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${participants.map(p => `
            <tr>
              <td>${p.name}</td>
              <td>${p.email}</td>
              <td>${p.phone}</td>
              <td>
                <span class="badge ${p.status === 'confirmed' ? 'bg-success' : 'bg-warning'}">
                  ${p.status === 'confirmed' ? '已確認' : '待確認'}
                </span>
              </td>
              <td>
                ${(user.role === 'admin' || p.ownerId === user.id) ? `
                  <button class="btn btn-sm btn-danger" onclick="deleteParticipant('${p.id}')">
                    刪除
                  </button>
                ` : '<span class="text-muted">無權限</span>'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;
}

// 刪除報名
async function deleteParticipant(id) {
  if (!confirm('確定要刪除此報名資料嗎？')) return;

  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${API_BASE}/api/signup/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || '刪除失敗');
    }

    alert('刪除成功');
    loadParticipants();

  } catch (error) {
    alert(`錯誤：${error.message}`);
  }
}
