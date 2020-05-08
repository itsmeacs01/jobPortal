const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

  adminName: {
    type: String,
    required: true,
  },
  adminCreatedAt: {
    type: Date,
    default: Date.now(),
  },
  adminEmail: {
    type: String,
    required: true,
  },
  adminResetToken: {
    type: String,
  },
  adminPassword: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  adminNumber: {
    type: Number,
    required: true,
  },

});
module.exports = mongoose.model('Admin', adminSchema);
