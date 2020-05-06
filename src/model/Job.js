const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  jobName: {
    type: String,
    required: true,
  },
  jobSalary: {
    type: String,
    required: true,
  },
  jobCategory: {
    type: String,
    required: true,
  },
  jobCreatedAt: {
    type: Date,
    default: Date.now(),
  },
  jobCompanyName: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
    min: 10,
    max: 500,
  },
  jobType: {
    type: String,
    required: true,
  },
  jobRequiredSkills: {
    type: Array,
    required: true,
  },

});
module.exports = mongoose.model('Job', jobSchema);
