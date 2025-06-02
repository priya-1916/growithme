const mongoose = require('mongoose');

const wateringScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  wateringSchedule: [wateringScheduleSchema]
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
