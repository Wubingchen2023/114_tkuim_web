import { ObjectId } from 'mongodb';
import { getCollection } from '../db.js';
import { Participant } from '../models/Participant.js';

export async function findAll() {
  const docs = await getCollection('participants').find().toArray();
  return docs.map(doc => new Participant(doc));
}

export async function findByOwner(ownerId) {
  const docs = await getCollection('participants')
    .find({ ownerId: new ObjectId(ownerId) })
    .toArray();
  return docs.map(doc => new Participant(doc));
}

export async function findById(id) {
  const doc = await getCollection('participants')
    .findOne({ _id: new ObjectId(id) });
  return doc ? new Participant(doc) : null;
}

export async function create({ name, email, phone, status, ownerId }) {
  const doc = {
    name,
    email,
    phone,
    status: status || 'pending',
    ownerId: new ObjectId(ownerId),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await getCollection('participants').insertOne(doc);
  return new Participant({ ...doc, _id: result.insertedId });
}

export async function updateById(id, updates) {
  const result = await getCollection('participants').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } },
    { returnDocument: 'after' }
  );

  return result.value ? new Participant(result.value) : null;
}

export async function deleteById(id) {
  const result = await getCollection('participants')
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
