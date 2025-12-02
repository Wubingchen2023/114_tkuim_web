import bcrypt from 'bcrypt';

const password = process.argv[2];

if (!password) {
  console.error('❌ 請提供密碼');
  console.log('使用方式：node scripts/hash-password.js <password>');
  process.exit(1);
}

const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('❌ 雜湊失敗:', err);
    process.exit(1);
  }
  console.log('\n✅ 密碼雜湊完成：');
  console.log(hash);
  console.log('\n請將此雜湊值貼入 mongo-init.js 或直接存入資料庫');
});
