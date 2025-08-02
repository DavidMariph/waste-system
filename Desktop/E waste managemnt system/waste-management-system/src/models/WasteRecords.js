const mongoose = require('mongoose');

const wasteRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  wasteType: {
    type: String,
    required: true,
    enum: ['Recyclable', 'Organic', 'Hazardous', 'Electronic', 'Other']
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WasteRecord', wasteRecordSchema);