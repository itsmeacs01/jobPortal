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
    if (req.userData.userRole === 'employers') {
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
        } = req.userData;
        const jobData = new Job({
          userId: id,
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
    } else {
      res.status(401).json({
        message: 'you are not a employer!',
      });
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
    if (req.userData.userRole === 'employers') {
      const {
        id,
      } = req.params;
      const findJob = await Job.findOne({
        _id: id,
      });
      if (findJob) {
        const employerId = req.userData.id;
        const checkJobCreatedUserId = await Job.findOne({
          $and: [{
            _id: id,
          }, {
            userId: employerId,
          }],
        });
        if (checkJobCreatedUserId) {
          const deleteJob = await Job.findOneAndDelete({
            _id: id,
          });
          if (deleteJob) {
            res.status(200).json({
              message: 'Job deleted successfully',
            });
          }
        }
        if (!checkJobCreatedUserId) {
          res.status(401).json({
            message: 'unauthorized user',
          });
        }
      }
      if (!findJob) {
        res.status(400).json({
          message: 'Job do not exists',
        });
      }
    } else {
      res.status(401).json({
        message: 'you are not a employer!',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.editJob = async (req, res, next) => {
  try {
    if (req.userData.userRole === 'employers') {
      const {
        id,
      } = req.params;
      const findJob = await Job.findOne({
        _id: id,
      });
      if (findJob) {
        const employerId = req.userData.id;
        const checkJobCreatedUserId = await Job.findOne({
          $and: [{
            _id: id,
          }, {
            userId: employerId,
          }],
        });
        if (checkJobCreatedUserId) {
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
          }
          if (!validate) {
            res.status(422).json({
              message: 'validation error, check your data entries!',
            });
          }
        }
        if (!checkJobCreatedUserId) {
          res.status(401).json({
            message: 'unauthorized user',
          });
        }
      }
      if (!findJob) {
        res.status(400).json({
          message: 'Job do not exists',
        });
      }
    } else {
      res.status(401).json({
        message: 'you are not a employer!',
      });
    }
  } catch (error) {
    if (error.name === 'ValdationError') {
      res.status(422);
    }
    next(error);
  }
};

exports.applyJob = async (req, res, next) => {
  try {
    if (req.userData.userRole === 'employee') {
      const {
        id,
      } = req.params;
      const findJob = await Job.findOne({
        _id: id,
      });
      if (findJob) {
        const userId = req.userData.id;

        const checkAppliedUserId = await Job.findOne({
          $and: [{
            _id: id,
          }, {
            appliedBy: {
              $all: [userId],
            },
          }],
        });
        if (checkAppliedUserId) {
          res.status(403).json({
            message: 'already applied',
          });
        }
        if (!checkAppliedUserId) {
          const addAppliedUser = await Job.updateOne({
            _id: id,
          }, {
            $push: {
              appliedBy: userId,
            },

          });
          if (addAppliedUser) {
            res.status(200).json({
              message: 'job applied successfully',
            });
          }
        }
      }
      if (!findJob) {
        res.status(400).json({
          message: 'Job do not exists',
        });
      }
    } else {
      res.status(401).json({
        message: 'you are not a employee',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.cancelApplyJob = async (req, res, next) => {
  try {
    if (req.userData.userRole === 'employee') {
      const {
        id,
      } = req.params;
      const findJob = await Job.findOne({
        _id: id,
      });
      if (findJob) {
        const userId = req.userData.id;

        const checkAppliedUserId = await Job.findOne({
          $and: [{
            _id: id,
          }, {
            appliedBy: {
              $all: [userId],
            },
          }],
        });
        if (checkAppliedUserId) {
          const deleteAppliedUser = await Job.update({
            _id: id,
          }, {
            $pull: {
              appliedBy: userId,
            },
          });
          if (deleteAppliedUser) {
            res.status(200).json({
              message: 'removed applied job successfully',
            });
          }
        }
        if (!checkAppliedUserId) {
          res.status(403).json({
            message: 'deleted the applied post || not applied!',
          });
        }
      }
      if (!findJob) {
        res.status(400).json({
          message: 'Job do not exists',
        });
      }
    } else {
      res.status(401).json({
        message: 'you are not a employee',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.searchJobs = async (req, res, next) => {
  try {
    const {
      text,
    } = req.params;

    const searchJobs = await Job.find({
      $or: [{
        jobName: {
          $regex: text,
          $options: 'i',
        },
      },
      {
        jobRequiredSkills: {
          $regex: text,
          $options: 'i',
        },
      },
      ],
    });
    if (searchJobs) {
      res.send(searchJobs);
    }
    if (!searchJobs) {
      res.status(400).json({
        message: 'not found',
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
