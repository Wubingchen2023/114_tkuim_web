export class Participant {
  constructor({ _id, name, email, phone, status, ownerId, createdAt, updatedAt }) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.status = status || 'pending';
    this.ownerId = ownerId; // 紀錄建立者
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this._id?.toString(),
      name: this.name,
      email: this.email,
      phone: this.phone,
      status: this.status,
      ownerId: this.ownerId?.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
