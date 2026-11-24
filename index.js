require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ferrari_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/theme', require('./routes/theme'));
app.use('/api/home', require('./routes/home'));
app.use('/api/about', require('./routes/about'));
app.use('/api/services', require('./routes/services'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/contact', require('./routes/contact'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});