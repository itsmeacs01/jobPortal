const express = require('express');

const jobRouter = express.Router();

const { jobCreate, jobView } = require('../controller/jobController');

jobRouter.get('/view', jobView);
jobRouter.post('/create', jobCreate);

module.exports = jobRouter;
