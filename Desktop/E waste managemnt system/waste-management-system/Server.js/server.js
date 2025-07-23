require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wasteDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const wasteSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  collectionPoint: {
    name: { type: String, required: true },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], required: true }
    }
  },
  wasteType: { type: String, enum: ['recyclable', 'organic', 'hazardous', 'electronic'], required: true },
  weight: { type: Number, required: true }, // in kg
  volume: Number, // in cubic meters
  handler: String,
  status: { type: String, default: 'pending', enum: ['pending', 'processed', 'disposed'] },
  notes: String
});

// Add geospatial index
wasteSchema.index({ 'collectionPoint.location': '2dsphere' });

const WasteRecord = mongoose.model('WasteRecord', wasteSchema);

// API Routes
app.post('/api/records', async (req, res) => {
  try {
    const record = new WasteRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/records/daily/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    const records = await WasteRecord.find({
      date: { $gte: date, $lt: nextDay }
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));