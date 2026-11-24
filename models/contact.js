const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  subject: { type: String, default: '', trim: true },
  message: { type: String, required: true, trim: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema(
  {
    address: { type: String, default: 'Via Abetone Inferiore 4, Maranello' },
    phone: { type: String, default: '+20 2 3539 0000' },
    email: { type: String, default: 'concierge@maranello-atelier.com' },
    messages: { type: [messageSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);