const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// جلب بيانات التواصل (GET /)
router.get('/', async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create({});
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// تحديث بيانات التواصل (PUT /)
router.put('/', async (req, res) => {
  try {
    const updateFields = {};
    if (req.body.address !== undefined) updateFields.address = req.body.address;
    if (req.body.phone !== undefined) updateFields.phone = req.body.phone;
    if (req.body.email !== undefined) updateFields.email = req.body.email;

    const updatedContact = await Contact.findOneAndUpdate(
      {},
      { $set: updateFields },
      { new: true, upsert: true }
    );

    res.json({
      message: 'Contact updated successfully',
      contact: updatedContact
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// إرسال رسالة جديدة من الزائر (POST /messages)
router.post('/messages', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact();
    }

    contact.messages.unshift({
      name,
      email,
      subject: subject || '',
      message,
      isRead: false
    });

    await contact.save();
    const createdMessage = contact.messages[0];

    res.status(201).json({
      message: 'Message sent successfully',
      data: createdMessage
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// جلب كل الرسائل للأدمن (GET /messages)
router.get('/messages', async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact ? contact.messages : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// تعليم رسالة كمقروءة (PATCH /messages/:msgId/read)
router.patch('/messages/:msgId/read', async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const targetMessage = contact.messages.id(req.params.msgId);
    if (!targetMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    targetMessage.isRead = true;
    await contact.save();

    res.json({
      message: 'Marked as read',
      data: targetMessage
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// حذف رسالة من الأدمن (DELETE /messages/:msgId)
router.delete('/messages/:msgId', async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const targetMessage = contact.messages.id(req.params.msgId);
    if (!targetMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    targetMessage.deleteOne();
    await contact.save();

    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
