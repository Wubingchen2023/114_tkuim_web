// example2_script.js
// 驗證 Email、手機與網域格式（@o365.tku.edu.tw）

const form = document.getElementById('contact-form');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

// 通用欄位驗證
function showValidity(input) {
  if (input.validity.valueMissing) {
    input.setCustomValidity('這個欄位必填');
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity('格式不正確，請確認輸入內容');
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity(input.title || '格式不正確');
  } else {
    input.setCustomValidity('');
  }
  return input.reportValidity();
}

// 新增：檢查 Email 網域是否為 @o365.tku.edu.tw
function checkEmailDomain() {
  const value = email.value.trim();
  if (value && !value.endsWith('@o365.tku.edu.tw')) {
    email.setCustomValidity('Email 必須為 @o365.tku.edu.tw 網域');
  } else {
    email.setCustomValidity('');
  }
  return email.reportValidity();
}

// 表單送出事件
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // 先做基本驗證
  const emailOk = showValidity(email);
  const phoneOk = showValidity(phone);

  // 再加上網域驗證（只有當基本格式正確才檢查）
  const domainOk = emailOk ? checkEmailDomain() : false;

  if (emailOk && phoneOk && domainOk) {
    alert('表單驗證成功，準備送出資料');
    form.reset();
  }
});

// 失焦時即時驗證
email.addEventListener('blur', () => {
  showValidity(email);
  checkEmailDomain();
});

phone.addEventListener('blur', () => {
  showValidity(phone);
});
