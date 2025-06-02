const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,  // Store the hashed password, make sure to hash it before saving
});

const User = mongoose.model('User', userSchema);

module.exports = User;
