const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  eyebrow: { type: String, default: 'About The Atelier' },
  title: { type: String, default: 'ENGINEERED WITHOUT COMPROMISE' },
  description: { type: String, default: 'Every vehicle curated within our showroom represents the pinnacle of Italian coachbuilding.' },
  image: { type: String, default: '' },
  badgeYears: { type: String, default: '75+ YEARS' }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);