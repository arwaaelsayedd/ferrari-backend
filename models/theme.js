const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    default: '#da291c' 
  },
  backgroundColor: {
    type: String,
    default: '#121212' 
  },
  cardColor: {
    type: String,
    default: '#1c1c1c' 
  },
  textColor: {
    type: String,
    default: '#ffffff' 
  },
  mutedTextColor: {
    type: String,
    default: '#9ca3af' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Theme', themeSchema);