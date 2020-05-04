const Job = require('../model/Job');

exports.jobView = async (req, res, next) => {
  try {
    const jobEntries = await Job.find();
    res.json(jobEntries);
  } catch (error) {
    next(error);
  }
};

exports.jobController = async (req, res, next) => {
  try {
    const job = new Job(req.body);
    const createdJob = await job.save();
    res.json(createdJob);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
};
