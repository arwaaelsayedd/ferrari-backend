const express = require('express');
const router = express.Router();
const Home = require('../models/home');

router.get('/', async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) home = await Home.create({});
    res.json(home);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const updatedHome = await Home.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ message: 'Home updated successfully', home: updatedHome });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;