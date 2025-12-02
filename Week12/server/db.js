import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db();
    console.log('MongoDB 連線成功');
    return db;
  } catch (error) {
    console.error('MongoDB 連線失敗:', error);
    process.exit(1);
  }
}

export function getCollection(collectionName) {
  if (!db) {
    throw new Error('資料庫尚未連線，請先呼叫 connectDB()');
  }
  return db.collection(collectionName);
}

export async function closeDB() {
  await client.close();
}
