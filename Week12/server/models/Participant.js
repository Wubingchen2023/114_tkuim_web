const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true  // 記錄建立者
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Participant', ParticipantSchema);
