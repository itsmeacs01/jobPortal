const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  jobName: {
    type: String,
    required: true,
  },
  jobPostedEmployersId: {
    type: Array,
  },
  jobSalary: {
    type: String,
    required: true,
    default: 'Negotiable',
  },
  jobCategory: {
    type: String,
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
  jobAppliedEmployeeIds: {
    type: Array,
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
