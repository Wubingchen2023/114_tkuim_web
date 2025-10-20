// example4_script.js
// 分數輸入與等第判斷

var input = prompt('請輸入分數（0–100）：');
var score = parseFloat(input);
var msg = '';

if (isNaN(score) || score < 0 || score > 100) {
  msg = '❌ 輸入不是有效的分數，請輸入 0–100 之間的數字！';
} else {
  // 根據分數判斷等第
  var grade = '';

  if (score >= 90) {
    grade = 'A';
  } else if (score >= 80) {
    grade = 'B';
  } else if (score >= 70) {
    grade = 'C';
  } else if (score >= 60) {
    grade = 'D';
  } else {
    grade = 'F';
  }

  msg = '你的分數是：' + score + '\n對應等第：' + grade;

  // 額外示範 switch：根據等第輸出評語
  switch (grade) {
    case 'A':
      msg += '\n評語：表現優秀！';
      break;
    case 'B':
      msg += '\n評語：表現良好！';
      break;
    case 'C':
      msg += '\n評語：可以再加油。';
      break;
    case 'D':
      msg += '\n評語：需加強練習。';
      break;
    case 'F':
      msg += '\n評語：未達及格，請努力！';
      break;
  }
}

alert('判斷完成，請查看頁面結果與 Console');
console.log(msg);
document.getElementById('result').textContent = msg;
