const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,

  },
  userRole: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiresAt: {
    type: Date,
  },
});
module.exports = mongoose.model('User', userSchema);
