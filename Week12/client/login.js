const API_BASE = 'http://localhost:3001';

// 頁面載入時檢查登入狀態
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
  setupLoginForm();
});

function checkLoginStatus() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (token && user.email) {
    showMainSection(user);
  } else {
    showLoginSection();
  }
}

function showLoginSection() {
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('mainSection').style.display = 'none';
  document.getElementById('userInfo').style.display = 'none';
}

function showMainSection(user) {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('mainSection').style.display = 'block';
  document.getElementById('userInfo').style.display = 'block';
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('userRole').textContent = 
    user.role === 'admin' ? '管理員' : '學員';
  
  // 載入報名資料
  loadParticipants();
}

function setupLoginForm() {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '登入失敗');
      }

      // 儲存 token 和使用者資訊
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 顯示主畫面
      showMainSection(data.user);
      
      // 清空表單
      document.getElementById('loginForm').reset();
      errorDiv.style.display = 'none';

    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.style.display = 'block';
    }
  });
}

function logout() {
  if (confirm('確定要登出嗎？')) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showLoginSection();
  }
}

// 檢查 token 是否過期
async function checkTokenValidity() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await fetch(`${API_BASE}/api/signup`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.status === 401) {
      alert('您的登入已過期，請重新登入');
      logout();
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
