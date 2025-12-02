import { getCollection } from '../db.js';
import { User } from '../models/User.js';

export async function findUserByEmail(email) {
  const doc = await getCollection('users').findOne({ email });
  return doc ? new User(doc) : null;
}

export async function createUser({ email, passwordHash, role = 'student' }) {
  const doc = {
    email,
    passwordHash,
    role,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await getCollection('users').insertOne(doc);
  return new User({ ...doc, _id: result.insertedId });
}

export async function findUserById(id) {
  const { ObjectId } = await import('mongodb');
  const doc = await getCollection('users').findOne({ _id: new ObjectId(id) });
  return doc ? new User(doc) : null;
}
