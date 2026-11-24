const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    eyebrow: { type: String, default: 'SCUDERIA HERITAGE & PRECISION' },
    title: { type: String, default: 'THE ART OF PERFORMANCE' },
    subtitle: { type: String, default: 'Forged in wind-tunnel precision and racing DNA.' },
    logoUrl: { type: String, default: 'http://localhost:5000/uploads/logo.jpg' },
    heroImage: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Home', homeSchema);