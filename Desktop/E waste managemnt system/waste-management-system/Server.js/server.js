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

// Define Schema for Simple Waste Records (as requested)
const wasteSchema = new mongoose.Schema({
  date: {
    type: String,  // Changed to String to store as "24/07/2025" format
    required: true
  },
  wasteType: {
    type: String,
    required: true,
    enum: ['Recyclable', 'Organic', 'Hazardous', 'Electronic', 'Other']
  },
  amount: {  // Changed from 'weight' to 'amount' as per your request
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

// Create Model
const WasteRecord = mongoose.model('WasteRecord', wasteSchema);

// API Routes
app.post('/api/waste-records', async (req, res) => {
  try {
    // Simple validation
    if (!req.body.date || !req.body.wasteType || !req.body.amount || !req.body.location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const record = new WasteRecord({
      date: req.body.date, // Storing as "DD/MM/YYYY" string
      wasteType: req.body.wasteType,
      amount: parseFloat(req.body.amount),
      location: req.body.location,
      notes: req.body.notes || ''
    });

    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ 
      error: 'Failed to save record',
      details: err.message 
    });
  }
});

app.get('/api/waste-records', async (req, res) => {
  try {
    const records = await WasteRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));