// const mongoose = require('mongoose');

// const wateringScheduleSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   plant: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Plant',
//     required: true,
//   },
//   plantName: {
//     type: String,
//     required: true,
//   },
//   wateringDate: {
//     type: Date,
//     required: true,
//   },
//   notificationSent: {
//     type: Boolean,
//     default: false,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('WateringSchedule', wateringScheduleSchema);
const mongoose = require('mongoose');

const wateringScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plantName: {
    type: String,
    required: true,
  },
  wateringDate: {
    type: Date,
    required: true,
  },
  wateringTime: {
    type: String, // Time will be stored as a string (e.g., '14:30')
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('WateringSchedule', wateringScheduleSchema);


 