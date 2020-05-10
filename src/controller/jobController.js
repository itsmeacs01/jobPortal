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
    const validate = await validationSchema.validateAsync(req.body);
    if (validate) {
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
        res.status(201).json({
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

exports.deleteJob = async (req, res, next) => {
  try {
    const {
      id,
    } = req.params;
    const findJob = await Job.findOne({
      _id: id,
    });
    if (findJob) {
      const deleteJob = await Job.findOneAndDelete({
        _id: id,
      });
      if (deleteJob) {
        res.status(200).json({
          message: 'Job deleted successfully',
        });
      }
    }
    if (!findJob) {
      res.status(400).json({
        message: 'Job do not exists',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.editJob = async (req, res, next) => {
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
    const validate = await validationSchema.validateAsync(req.body);
    if (validate) {
      const {
        jobName,
        jobSalary,
        jobCategory,
        jobCompanyName,
        jobDescription,
        jobType,
        jobRequiredSkills,
      } = req.body;
      const {
        id,
      } = req.params;
      const checkJob = await Job.findOne({
        _id: id,
      });
      const editJobInfo = await Job.updateOne({
        _id: id,
      }, {
        $set: {
          jobName,
          jobSalary,
          jobCategory,
          jobCompanyName,
          jobDescription,
          jobType,
          jobRequiredSkills,
        },
      });
      if (editJobInfo.nModified === 0) {
        res.status(304).json({
          message: 'Job information not modified',
        });
      } else {
        res.status(201).json({
          message: 'Job information edited successfully',
        });
      }
      if (!checkJob) {
        res.status(400).json({
          message: 'Job do not exist',
        });
      }
    }
  } catch (error) {
    if (error.name === 'ValdationError') {
      res.status(422);
    }
    next(error);
  }
};
