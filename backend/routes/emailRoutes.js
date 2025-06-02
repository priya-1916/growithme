const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { sendWateringReminder } = require('../services/emailService');

router.post('/send-reminder', auth, async (req, res) => {
  try {
    const { email, plantName, wateringDate } = req.body;

    if (!email || !plantName || !wateringDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, plantName, or wateringDate'
      });
    }

    await sendWateringReminder(email, plantName, wateringDate);

    res.status(200).json({
      success: true,
      message: 'Email reminder sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email reminder',
      error: error.message
    });
  }
});

module.exports = router;
