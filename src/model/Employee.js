const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
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
    min: 5,
    max: 30,
  },
  skills: {
    type: Array,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
});
module.exports = mongoose.model('Employee', employeeSchema);
