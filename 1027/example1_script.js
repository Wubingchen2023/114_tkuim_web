// example1_script.js
// 統一在父層監聽點擊與送出事件，處理清單項目新增/刪除

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) {
    return;
  }
  const item = document.createElement('li');
  item.className = 'list-group-item d-flex justify-content-between align-items-center';
  item.innerHTML = `${value} <button class="btn btn-sm btn-outline-danger" data-action="remove">刪除</button>`;
  list.appendChild(item);
  input.value = '';
  input.focus();
});

// ---- 事件委派：刪除與完成 ----
list.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;
  const item = target.closest('li');

  if (action === 'remove') {
    item.remove();
  } else if (action === 'done') {
    item.classList.toggle('list-group-item-success');
  }
});

// ---- 監聽 keyup：按 Enter 自動送出 ----
input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    form.dispatchEvent(new Event('submit'));
  }
});
