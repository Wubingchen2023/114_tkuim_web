// example1_script.js
// 傳統語法：僅使用 var、function、字串串接

// 顯示提示窗
alert('歡迎來到 JavaScript！');

// 在 Console 顯示訊息
console.log('Hello JavaScript from console');

// 在頁面指定區域輸出文字
var el = document.getElementById('result');
el.textContent = '這行文字是由外部 JS 檔案寫入的。';
el.textContent = '學號: 412630187，姓名: 吳秉宸';

// 定義按鈕點擊事件函式
function showMessage() {
  alert('你剛剛按下了按鈕！');
}

// 綁定事件監聽
var btn = document.getElementById('btnAlert');
btn.onclick = showMessage;