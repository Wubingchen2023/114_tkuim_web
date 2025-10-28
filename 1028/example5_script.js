// example5_script.js
// 攔截 submit，聚焦第一個錯誤並模擬送出流程 + 隱私條款彈窗確認

const form = document.getElementById('full-form');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

// 新增：隱私條款相關節點
const agree = document.getElementById('agree');
const openPrivacyBtn = document.getElementById('openPrivacy');
const privacyModalEl = document.getElementById('privacyModal');
const privacyModal = new bootstrap.Modal(privacyModalEl);
const confirmPrivacyBtn = document.getElementById('confirmPrivacy');

function validateAllInputs(formElement) {
  let firstInvalid = null;
  const controls = Array.from(formElement.querySelectorAll('input, select, textarea'));
  controls.forEach((control) => {
    control.classList.remove('is-invalid');
    if (!control.checkValidity()) {
      control.classList.add('is-invalid');
      if (!firstInvalid) {
        firstInvalid = control;
      }
    }
  });
  return firstInvalid;
}

// ====== 新增：隱私條款視窗互動 ======

// 1) 點「先閱讀隱私條款」按鈕 → 開啟 Modal
openPrivacyBtn.addEventListener('click', () => {
  privacyModal.show();
});

// 2) 直接點 checkbox 想勾選時 → 攔截並改為顯示 Modal
agree.addEventListener('click', (e) => {
  // 如果目前是未勾選狀態，代表使用者想勾選 → 先看條款
  if (!agree.checked) {
    e.preventDefault();        // 阻止預設勾選
    privacyModal.show();       // 打開條款視窗
  }
  // 如果目前已經是勾選狀態、使用者再次點擊 → 允許取消勾選（不攔截）
});

// 3) 在 Modal 裡按「我已閱讀並同意」 → 幫他勾選 checkbox + 關閉
confirmPrivacyBtn.addEventListener('click', () => {
  agree.checked = true;                 // 程式化勾選
  agree.classList.remove('is-invalid'); // 清除錯誤樣式（若有）
  privacyModal.hide();
  // 為了可及性，關閉後讓焦點回到送出鍵（或 agree）
  submitBtn.focus();
});

// ====== 既有送出/清除/即時驗證 ======

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';

  const firstInvalid = validateAllInputs(form);
  if (firstInvalid) {
    submitBtn.disabled = false;
    submitBtn.textContent = '送出';
    firstInvalid.focus();
    return;
  }

  // （示範）模擬送出
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert('資料已送出，感謝您的聯絡！');
  form.reset();
  submitBtn.disabled = false;
  submitBtn.textContent = '送出';
});

resetBtn.addEventListener('click', () => {
  form.reset();
  Array.from(form.elements).forEach((element) => {
    element.classList.remove('is-invalid');
  });
});

form.addEventListener('input', (event) => {
  const target = event.target;
  if (target.classList.contains('is-invalid') && target.checkValidity()) {
    target.classList.remove('is-invalid');
  }
});
