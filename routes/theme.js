const express = require('express');
const router = express.Router();
const Theme = require('../models/theme');

// 1. GET: جلب إعدادات الـ Theme الحالية (ولو مش موجودة ينشئ الإعدادات الافتراضية)
router.get('/', async (req, res) => {
  try {
    let theme = await Theme.findOne();
    if (!theme) {
      theme = await Theme.create({});
    }
    res.json(theme);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch theme', details: err.message });
  }
});

// 2. PUT: تحديث ألوان الـ Theme من لوحة التحكم
router.put('/', async (req, res) => {
  try {
    const updatedTheme = await Theme.findOneAndUpdate(
      {}, // يجيب أول وثيقة موجودة
      req.body,
      { new: true, upsert: true } // يرجع البيانات الجديدة وينشئها لو مش موجودة
    );
    res.json({ message: 'Theme updated successfully!', theme: updatedTheme });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update theme', details: err.message });
  }
});

module.exports = router;