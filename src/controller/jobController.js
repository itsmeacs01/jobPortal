const Job = require('../model/Job');

exports.jobView = async (req, res, next) => {
  try {
    const jobEntries = await Job.find();
    res.json(jobEntries);
  } catch (error) {
    next(error);
  }
};

exports.jobCreate = async (req, res, next) => {
  try {
    const job = new Job(req.body);
    const jobCreated = await job.save();
    if (jobCreated) {
      res.status(200).json({
        message: 'Job created successfully',
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
