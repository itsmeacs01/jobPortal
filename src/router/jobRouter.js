const express = require('express');

const jobRouter = express.Router();

const { jobController, jobView } = require('../controller/jobController');

jobRouter.get('/view', jobView);
jobRouter.post('/create', jobController);

module.exports = jobRouter;
