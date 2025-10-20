// example5_script.js
// 使用者輸入起訖範圍，產生乘法表

var start = prompt('請輸入乘法起始數（1~9）：');
var end = prompt('請輸入乘法結束數（1~9）：');

// 轉為整數
var s = parseInt(start, 10);
var e = parseInt(end, 10);
var output = '';

// 範圍檢查
if (isNaN(s) || isNaN(e) || s < 1 || e > 9 || s > e) {
  output = '❌ 輸入錯誤！請輸入 1~9 的整數，且起始 ≤ 結束。';
} else {
  output += '【顯示 ' + s + ' 到 ' + e + ' 的乘法表】\n\n';

  for (var i = s; i <= e; i++) {
    for (var j = 1; j <= 9; j++) {
      output += i + ' x ' + j + ' = ' + (i * j) + '\t';
    }
    output += '\n';
  }
}

alert('運算完成，請看頁面結果與 Console');
console.log(output);
document.getElementById('result').textContent = output;
