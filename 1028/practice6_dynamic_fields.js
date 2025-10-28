// practice6_dynamic_fields.js
// 動態新增報名欄位 + 事件委派 + 即時驗證 + 送出攔截
// 新增：匯出（JSON/文字）+ localStorage 暫存/還原 + 更醒目的無效樣式

const form = document.getElementById('dynamic-form');
const list = document.getElementById('participant-list');
const addBtn = document.getElementById('add-participant');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const countLabel = document.getElementById('count');

const exportJsonBtn = document.getElementById('export-json');
const exportTextBtn = document.getElementById('export-text');
const clearStorageBtn = document.getElementById('clear-storage');

const maxParticipants = 5;
let participantIndex = 0;

// ---- 暫存鍵值 ----
const STORAGE_KEY = 'practice6.participants.v1';

// ---- 元件建立 ----
function createParticipantCard() {
  const index = participantIndex++;
  const wrapper = document.createElement('div');
  wrapper.className = 'participant card border-0 shadow-sm';
  wrapper.dataset.index = index;
  wrapper.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-3">
        <h5 class="card-title mb-0">參與者 ${index + 1}</h5>
        <button type="button" class="btn btn-sm btn-outline-danger" data-action="remove">移除</button>
      </div>
      <div class="mb-3">
        <label class="form-label" for="name-${index}">姓名</label>
        <input id="name-${index}" name="name-${index}" class="form-control" type="text" required aria-describedby="name-${index}-error">
        <p id="name-${index}-error" class="text-danger small mb-0" aria-live="polite"></p>
      </div>
      <div class="mb-0">
        <label class="form-label" for="email-${index}">Email</label>
        <input id="email-${index}" name="email-${index}" class="form-control" type="email" required aria-describedby="email-${index}-error" inputmode="email">
        <p id="email-${index}-error" class="text-danger small mb-0" aria-live="polite"></p>
      </div>
    </div>
  `;
  return wrapper;
}

function updateCount() {
  countLabel.textContent = list.children.length;
  addBtn.disabled = list.children.length >= maxParticipants;
}

// ---- 驗證 ----
function setError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  input.setCustomValidity(message || '');
  error.textContent = message || '';
  if (message) {
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-invalid');
  }
}

function validateInput(input) {
  const value = input.value.trim();
  if (!value) {
    setError(input, '此欄位必填');
    return false;
  }
  if (input.type === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setError(input, 'Email 格式不正確');
      return false;
    }
  }
  setError(input, '');
  return true;
}

// ---- 序列化 / 還原 ----
function serializeParticipants() {
  const data = [];
  list.querySelectorAll('.participant').forEach((card) => {
    const nameInput = card.querySelector('input[type="text"]');
    const emailInput = card.querySelector('input[type="email"]');
    data.push({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
    });
  });
  return data;
}

function renderFromData(arr) {
  // 先清空
  list.innerHTML = '';
  participantIndex = 0;
  // 逐筆建立
  arr.slice(0, maxParticipants).forEach((p) => {
    const card = createParticipantCard();
    list.appendChild(card);
    const nameInput = card.querySelector('input[type="text"]');
    const emailInput = card.querySelector('input[type="email"]');
    nameInput.value = p.name || '';
    emailInput.value = p.email || '';
    // 重新驗證一次以標記狀態
    validateInput(nameInput);
    validateInput(emailInput);
  });
  updateCount();
}

function saveToStorage() {
  const data = serializeParticipants();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  try {
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      renderFromData(data);
      return true;
    }
  } catch (_) {}
  return false;
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

// ---- 事件：新增/移除 ----
function handleAddParticipant() {
  if (list.children.length >= maxParticipants) return;
  const participant = createParticipantCard();
  list.appendChild(participant);
  updateCount();
  participant.querySelector('input').focus();
  saveToStorage(); // 新增後即存
}

addBtn.addEventListener('click', handleAddParticipant);

list.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action="remove"]');
  if (!button) return;
  const participant = button.closest('.participant');
  participant?.remove();
  updateCount();
  saveToStorage(); // 移除後即存
});

// ---- 即時驗證 + 變更即存 ----
list.addEventListener('blur', (event) => {
  if (event.target.matches('input')) {
    validateInput(event.target);
    saveToStorage();
  }
}, true);

list.addEventListener('input', (event) => {
  if (event.target.matches('input')) {
    const wasInvalid = event.target.validationMessage;
    if (wasInvalid) validateInput(event.target);
    saveToStorage();
  }
});

// ---- 匯出（JSON / 文字） ----
function download(filename, content, mime) {
  const blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

exportJsonBtn.addEventListener('click', () => {
  const data = serializeParticipants();
  if (data.length === 0) {
    alert('尚無參與者資料可匯出');
    return;
  }
  const json = JSON.stringify(data, null, 2);
  download('participants.json', json, 'application/json');
});

exportTextBtn.addEventListener('click', () => {
  const data = serializeParticipants();
  if (data.length === 0) {
    alert('尚無參與者資料可匯出');
    return;
  }
  // 文字格式：一行一筆「姓名, Email」
  const text = data.map(p => `${p.name}, ${p.email}`).join('\n');
  download('participants.txt', text, 'text/plain;charset=utf-8');
});

clearStorageBtn.addEventListener('click', () => {
  clearStorage();
  alert('已清除暫存資料（畫面不會變動）');
});

// ---- 送出 / 重設 ----
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (list.children.length === 0) {
    alert('請至少新增一位參與者');
    handleAddParticipant();
    return;
  }

  let firstInvalid = null;
  list.querySelectorAll('input').forEach((input) => {
    const valid = validateInput(input);
    if (!valid && !firstInvalid) firstInvalid = input;
  });

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';
  await new Promise((resolve) => setTimeout(resolve, 800));
  alert('表單已送出！');

  form.reset();
  list.innerHTML = '';
  participantIndex = 0;
  updateCount();
  submitBtn.disabled = false;
  submitBtn.textContent = '送出';

  // 成功送出後清除暫存
  clearStorage();
});

resetBtn.addEventListener('click', () => {
  form.reset();
  list.innerHTML = '';
  participantIndex = 0;
  updateCount();
  // 重設時也清除暫存
  clearStorage();
});

// ---- 初始化：先嘗試從暫存還原，若無則預設新增一筆 ----
if (!loadFromStorage()) {
  // 預設新增一筆，方便觀察
  handleAddParticipant();
}
