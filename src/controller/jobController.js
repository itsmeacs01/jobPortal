const joi = require('@hapi/joi');

const Job = require('../model/Job');

exports.viewJob = async (req, res, next) => {
  try {
    const jobEntries = await Job.find();
    res.json(jobEntries);
  } catch (error) {
    next(error);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const validationSchema = joi.object({
      jobName: joi.string().trim().required(),
      jobSalary: joi.string().trim().required(),
      jobCategory: joi.string().trim().required(),
      jobCompanyName: joi.string().trim().required(),
      jobDescription: joi.string().trim().min(10).max(500)
        .required(),
      jobType: joi.string().trim().required(),
      jobRequiredSkills: joi.array().required(),
    });
    const Validate = await validationSchema.validateAsync(req.body);
    if (Validate) {
      const {
        jobName,
        jobSalary,
        jobCategory,
        jobCompanyName,
        jobDescription,
        jobType,
        jobRequiredSkills,
      } = req.body;
      const jobData = new Job({
        jobName,
        jobSalary,
        jobCategory,
        jobCompanyName,
        jobDescription,
        jobType,
        jobRequiredSkills,
      });
      const jobCreated = await jobData.save();
      if (jobCreated) {
        res.status(200).json({
          message: 'Job created successfully',
        });
      }
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422).json({
        message: 'Failed to create job',
      });
    }
    next(error);
  }
};
