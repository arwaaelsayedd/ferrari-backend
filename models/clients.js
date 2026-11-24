const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: '' },
  quote: { type: String, required: true },
  image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);