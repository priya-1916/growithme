const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

// Add a new plant
router.post('/add', async (req, res) => {
  try {
    const { name, category, wateringSchedule } = req.body;

    const newPlant = new Plant({ name, category, wateringSchedule });
    await newPlant.save();

    res.status(201).json({ message: 'Plant saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Optional: Get all plants
router.get('/get', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
