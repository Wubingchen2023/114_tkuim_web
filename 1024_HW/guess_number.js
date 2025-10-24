// 使用巢狀條件與多重迴圈練習：猜數字遊戲

// 產生隨機數（1~100）
function generateAnswer() {
  return Math.floor(Math.random() * 100) + 1;
}

// 檢查使用者輸入是否合法
function parseInput(str) {
  var n = parseInt(str, 10);
  if (isNaN(n) || n < 1 || n > 100) {
    alert('請輸入 1–100 的整數！');
    return null;
  }
  return n;
}

// 主遊戲邏輯
function playGame() {
  var answer = generateAnswer();
  var count = 0;
  var history = []; // 記錄猜測歷程
  var msg = '';

  while (true) {
    var input = prompt('請輸入你猜的數字（1–100）：\n（輸入 q 可離開）');
    if (input === null || input.toLowerCase() === 'q') {
      msg = '遊戲中止。答案是：' + answer;
      break;
    }

    var guess = parseInput(input);
    if (guess === null) {
      continue; // 輸入不合法，重來
    }

    count++;
    history.push(guess);

    // 巢狀條件：比較數值大小
    if (guess === answer) {
      msg = '🎯 恭喜你猜中了！\n答案：' + answer +
            '\n總共猜了 ' + count + ' 次。\n\n猜測歷程：' + history.join(', ');
      break;
    } else if (guess < answer) {
      alert('再大一點！');
    } else {
      alert('再小一點！');
    }
  }

  // 結果輸出
  document.getElementById('result').textContent = msg;
  console.log(msg);
}

// 程式進入點
playGame();
