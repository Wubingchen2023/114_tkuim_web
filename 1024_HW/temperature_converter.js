// 使用巢狀條件與多個函式完成攝氏 ↔ 華氏轉換

// 將華氏轉攝氏
function toCelsius(f) {
  return (f - 32) * 5 / 9;
}

// 將攝氏轉華氏
function toFahrenheit(c) {
  return c * 9 / 5 + 32;
}

// 輸出結果到頁面與 alert
function showResult(original, converted, unitFrom, unitTo) {
  var text = '原始溫度：' + original + '°' + unitFrom + '\n'
           + '轉換後溫度：' + converted.toFixed(2) + '°' + unitTo;
  alert(text);
  document.getElementById('result').textContent = text;
}

// 主流程（主控函式）
function runConverter() {
  var tempStr = prompt('請輸入溫度數值：');
  var unit = prompt('請輸入單位（C 或 F）：');

  // 巢狀條件：判斷輸入是否有效
  if (!tempStr || !unit) {
    alert('輸入不完整！');
    return;
  }

  var temp = parseFloat(tempStr);
  unit = unit.toUpperCase();

  if (isNaN(temp)) {
    alert('請輸入有效的數字！');
    return;
  }

  // 多重條件判斷
  if (unit === 'C') {
    var f = toFahrenheit(temp);
    showResult(temp, f, 'C', 'F');
  } else if (unit === 'F') {
    var c = toCelsius(temp);
    showResult(temp, c, 'F', 'C');
  } else {
    alert('單位輸入錯誤，請輸入 C 或 F！');
  }
}

// 程式進入點
runConverter();
