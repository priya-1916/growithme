const nodemailer = require('nodemailer');
require('dotenv').config(); // To access EMAIL_USER and EMAIL_PASSWORD

// Setup reusable transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send a watering reminder email.
 * @param {string} email - Recipient email address
 * @param {string} plantName - Name of the plant
 * @param {string} wateringDate - Date of watering
 */
const sendWateringReminder = async (email, plantName, wateringDate) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Watering Reminder for ${plantName}`,
    html: `
      <h2>Don't forget to water your plant!</h2>
      <p>This is a reminder to water your <strong>${plantName}</strong>.</p>
      <p>Scheduled watering time: <strong>${wateringDate}</strong></p>
      <p>Happy gardening! 🌱</p>
    `
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendWateringReminder
};
