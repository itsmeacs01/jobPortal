const express = require('express');

const jobRouter = express.Router();

const { createJob, viewJob } = require('../controller/jobController');

jobRouter.get('/view', viewJob);
jobRouter.post('/create', createJob);

module.exports = jobRouter;
