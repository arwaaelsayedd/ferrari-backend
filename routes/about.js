const express = require('express');
const router = express.Router();
const About = require('../models/about');

router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const updatedAbout = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ message: 'About updated successfully', about: updatedAbout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;