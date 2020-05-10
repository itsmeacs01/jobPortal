const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },
  skills: {
    type: Array,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('Employee', employeeSchema);
