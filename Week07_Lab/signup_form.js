// signup_form.js

// -------------------------
// 欄位選取
// -------------------------
const form = document.getElementById('signupForm');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const phoneEl = document.getElementById('phone');
const pwdEl = document.getElementById('password');
const confirmPwdEl = document.getElementById('confirmPwd');
const interestGroup = document.getElementById('interestGroup');
const interestsError = document.getElementById('interestsError');
const termsEl = document.getElementById('terms');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const formStatus = document.getElementById('formStatus');
const strengthBar = document.querySelector('.bar-fill');
const strengthText = document.getElementById('passwordStrength');

// 錯誤訊息對應
const errorMap = {
  name: '請輸入姓名',
  email: '請輸入有效的 Email',
  phone: '請輸入 10 碼數字手機號碼',
  password: '密碼需至少 8 碼，且包含英數字',
  confirmPwd: '兩次輸入的密碼不一致',
  interests: '請至少勾選一個興趣',
  terms: '請勾選同意服務條款',
};

// localStorage 暫存 key
const LS_KEY = 'signupFormData';

// -------------------------
// 事件委派－興趣複選框
// -------------------------
interestGroup.addEventListener('change', (e) => {
  // 統計勾選個數，切換樣式
  const checkboxes = interestGroup.querySelectorAll('input[type="checkbox"]');
  let checkedCount = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) {
      cb.parentNode.classList.add('checked');
      checkedCount++;
    } else {
      cb.parentNode.classList.remove('checked');
    }
  });
  // 即時驗證
  validateInterests();
  saveFormData();
});

// -------------------------
// 即時驗證：blur & input
// -------------------------
const fields = [
  { el: nameEl, key: 'name', error: document.getElementById('nameError'), validator: validateName },
  { el: emailEl, key: 'email', error: document.getElementById('emailError'), validator: validateEmail },
  { el: phoneEl, key: 'phone', error: document.getElementById('phoneError'), validator: validatePhone },
  { el: pwdEl, key: 'password', error: document.getElementById('passwordError'), validator: validatePassword },
  { el: confirmPwdEl, key: 'confirmPwd', error: document.getElementById('confirmPwdError'), validator: validateConfirmPwd },
  { el: termsEl, key: 'terms', error: document.getElementById('termsError'), validator: validateTerms },
];

// blur 時顯示錯誤
fields.forEach(({el, validator}) => {
  el.addEventListener('blur', () => {
    validator();
  });
});
// input 時即時更新
fields.forEach(({el, validator}) => {
  el.addEventListener('input', () => {
    validator();
    saveFormData();
  });
});

// 密碼強度條即時更新
pwdEl.addEventListener('input', () => {
  updateStrengthBar(pwdEl.value);
});

// 密碼欄與確認欄都要觸發密碼一致性檢查
pwdEl.addEventListener('input', validateConfirmPwd);
confirmPwdEl.addEventListener('input', validateConfirmPwd);

// 服務條款
termsEl.addEventListener('change', () => {
  validateTerms();
  saveFormData();
});

// -------------------------
// 驗證函式
// -------------------------

function validateName() {
  let value = nameEl.value.trim();
  let errEl = document.getElementById('nameError');
  if (!value) {
    nameEl.setCustomValidity(errorMap.name);
    errEl.textContent = errorMap.name;
  } else {
    nameEl.setCustomValidity('');
    errEl.textContent = '';
  }
  return !nameEl.validationMessage;
}

function validateEmail() {
  let value = emailEl.value.trim();
  let errEl = document.getElementById('emailError');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    emailEl.setCustomValidity(errorMap.email);
    errEl.textContent = errorMap.email;
  } else if (!emailPattern.test(value)) {
    emailEl.setCustomValidity('Email 格式錯誤');
    errEl.textContent = 'Email 格式錯誤';
  } else {
    emailEl.setCustomValidity('');
    errEl.textContent = '';
  }
  return !emailEl.validationMessage;
}

function validatePhone() {
  let value = phoneEl.value.trim();
  let errEl = document.getElementById('phoneError');
  const phonePattern = /^\d{10}$/;
  if (!value) {
    phoneEl.setCustomValidity(errorMap.phone);
    errEl.textContent = errorMap.phone;
  } else if (!phonePattern.test(value)) {
    phoneEl.setCustomValidity('手機號碼需為 10 碼數字');
    errEl.textContent = '手機號碼需為 10 碼數字';
  } else {
    phoneEl.setCustomValidity('');
    errEl.textContent = '';
  }
  return !phoneEl.validationMessage;
}

function validatePassword() {
  let value = pwdEl.value;
  let errEl = document.getElementById('passwordError');
  // 至少8碼且英數混合
  const pwdPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!value) {
    pwdEl.setCustomValidity(errorMap.password);
    errEl.textContent = errorMap.password;
  } else if (!pwdPattern.test(value)) {
    pwdEl.setCustomValidity('密碼需至少8碼且包含英數字');
    errEl.textContent = '密碼需至少8碼且包含英數字';
  } else {
    pwdEl.setCustomValidity('');
    errEl.textContent = '';
  }
  return !pwdEl.validationMessage;
}

function validateConfirmPwd() {
  let value = confirmPwdEl.value;
  let errEl = document.getElementById('confirmPwdError');
  if (!value) {
    confirmPwdEl.setCustomValidity(errorMap.confirmPwd);
    errEl.textContent = errorMap.confirmPwd;
  } else if (value !== pwdEl.value) {
    confirmPwdEl.setCustomValidity('兩次輸入的密碼不一致');
    errEl.textContent = '兩次輸入的密碼不一致';
  } else {
    confirmPwdEl.setCustomValidity('');
    errEl.textContent = '';
  }
  return !confirmPwdEl.validationMessage;
}

function validateInterests() {
  const checked = interestGroup.querySelectorAll('input[type="checkbox"]:checked').length;
  if (checked === 0) {
    interestsError.textContent = errorMap.interests;
    return false;
  } else {
    interestsError.textContent = '';
    return true;
  }
}

function validateTerms() {
  let errEl = document.getElementById('termsError');
  if (!termsEl.checked) {
    termsEl.setCustomValidity(errorMap.terms);
    errEl.textContent = errorMap.terms;
  } else {
    termsEl.setCustomValidity('');
    errEl.textContent = '';
  }
  return !termsEl.validationMessage;
}

function validateAllFields() {
  let valid = true;
  fields.forEach(({validator}) => {
    if (!validator()) valid = false;
  });
  if (!validateInterests()) valid = false;
  return valid;
}

// -------------------------
// 密碼強度條
// -------------------------
function updateStrengthBar(pwd) {
  let strength = 0;
  let msg = '密碼強度：弱';
  let className = 'weak';
  // 英數混合
  if (pwd.length >= 8) {
    if (/[A-Za-z]/.test(pwd) && /\d/.test(pwd)) strength = 1;
    if (/[A-Za-z]/.test(pwd) && /\d/.test(pwd) && /[^A-Za-z\d]/.test(pwd)) strength = 2;
  }
  if (pwd.length >= 12 && strength === 2) strength = 3;
  if (pwd.length === 0) strength = 0;
  switch (strength) {
    case 0:
      msg = '密碼強度：-'; className = '';
      break;
    case 1:
      msg = '密碼強度：中'; className = 'medium';
      break;
    case 2:
      msg = '密碼強度：強'; className = 'strong';
      break;
    case 3:
      msg = '密碼強度：極強'; className = 'strong';
      break;
    default:
      msg = '密碼強度：弱'; className = 'weak';
  }
  strengthText.textContent = msg;
  strengthBar.className = 'bar-fill ' + className;
}

// -------------------------
// localStorage 暫存與還原
// -------------------------
function saveFormData() {
  const data = {
    name: nameEl.value,
    email: emailEl.value,
    phone: phoneEl.value,
    password: pwdEl.value,
    confirmPwd: confirmPwdEl.value,
    interests: Array.from(interestGroup.querySelectorAll('input[type="checkbox"]'))
      .filter(cb => cb.checked).map(cb => cb.value),
    terms: termsEl.checked
  };
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}
function restoreFormData() {
  const data = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
  if (!data) return;
  if (data.name) nameEl.value = data.name;
  if (data.email) emailEl.value = data.email;
  if (data.phone) phoneEl.value = data.phone;
  if (data.password) pwdEl.value = data.password;
  if (data.confirmPwd) confirmPwdEl.value = data.confirmPwd;
  if (Array.isArray(data.interests)) {
    Array.from(interestGroup.querySelectorAll('input[type="checkbox"]')).forEach(cb => {
      cb.checked = data.interests.includes(cb.value);
      cb.parentNode.classList.toggle('checked', cb.checked);
    });
  }
    if (data.terms) termsEl.checked = data.terms;
}

async function submitSignup(data) {
  const response = await fetch('http://localhost:3001/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const payload = await response.json();
    throw new Error(payload.error || '報名失敗');
  }
  return response.json();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // 前端驗證
  if (!validateAllFields()) return;

  // 組 payload（與 localStorage 結構一致）
  const payload = {
    name: nameEl.value.trim(),
    email: emailEl.value.trim(),
    phone: phoneEl.value.trim(),
    password: pwdEl.value.trim(),
    confirmPwd: confirmPwdEl.value.trim(),
    interests: Array.from(
      interestGroup.querySelectorAll('input[type="checkbox"]:checked')
    ).map(cb => cb.value),
    terms: termsEl.checked
  };

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = '送出中...';

    // 呼叫 API
    const result = await submitSignup(payload);

    // 成功訊息
    toast.show(`${result.message || "報名成功"}`);

    // 清空表單 & localStorage
    form.reset();
    localStorage.removeItem(LS_KEY);

  } catch (err) {
    // API 錯誤
    toast.show(`${err.message}`);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = '送出';
  }
});


