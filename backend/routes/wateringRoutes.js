// const express = require('express');
// const router = express.Router();
// const WateringSchedule = require('../models/WateringSchedule');
// const User = require('../models/User');
// const { sendWateringConfirmation } = require('../services/emailService');
// const jwt = require('jsonwebtoken');


// const authMiddleware = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
  
//   if (!token) {
//     return res.status(401).json({ message: 'Authentication required' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };



// router.post('/watering-schedules', authMiddleware, async (req, res) => {
//   const { plantName, wateringDate, wateringTime } = req.body;
//   console.log('Request body received:', req.body);

//   // Validation
//   if (!plantName || !wateringDate || !wateringTime) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     // Combine date and time into a Date object
//     const [hours, minutes] = wateringTime.split(':');
//     const wateringDateTime = new Date(wateringDate);
//     wateringDateTime.setHours(parseInt(hours), parseInt(minutes));

//     if (isNaN(wateringDateTime.getTime())) {
//       return res.status(400).json({ message: 'Invalid watering date or time' });
//     }

//     const schedule = new WateringSchedule({
//       user: req.user._id,
//       plantName,
//       wateringDate,
//       wateringTime,
//     });

//     await schedule.save();

//     res.status(201).json(schedule.toJSON());
//   } catch (error) {
//     console.error('Error creating watering schedule:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.delete('/watering-schedules/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedSchedule = await WateringSchedule.findByIdAndDelete(id);

//     if (!deletedSchedule) {
//       return res.status(404).json({ message: 'Watering schedule not found' });
//     }

//     res.status(200).json({ message: 'Watering schedule deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting watering schedule:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// module.exports = router;



const express = require('express');
const router = express.Router();
const WateringSchedule = require('../models/WateringSchedule');
const User = require('../models/User');
const { sendWateringConfirmation } = require('../services/emailService');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/watering-schedules', authMiddleware, async (req, res) => {
  const { plantName, wateringDate, wateringTime } = req.body;
  console.log('Request body received:', req.body);

  // Validation
  if (!plantName || !wateringDate || !wateringTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Combine date and time into a Date object
    const [hours, minutes] = wateringTime.split(':');
    const wateringDateTime = new Date(wateringDate);
    wateringDateTime.setHours(parseInt(hours), parseInt(minutes));

    if (isNaN(wateringDateTime.getTime())) {
      return res.status(400).json({ message: 'Invalid watering date or time' });
    }

    const schedule = new WateringSchedule({
      user: req.user._id,
      plantName,
      wateringDate,
      wateringTime,
    });

    await schedule.save();

    res.status(201).json(schedule.toJSON());
  } catch (error) {
    console.error('Error creating watering schedule:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/watering-schedules/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSchedule = await WateringSchedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Watering schedule not found' });
    }

    res.status(200).json({ message: 'Watering schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting watering schedule:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;