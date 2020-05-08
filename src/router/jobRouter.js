const express = require('express');

const jobRouter = express.Router();

const {
  createJob,
  viewJob,
  deleteJob,
  editJob,
} = require('../controller/jobController');

jobRouter.get('/view', viewJob);
jobRouter.post('/create', createJob);
jobRouter.delete('/delete/:id', deleteJob);
jobRouter.patch('/edit/:id', editJob);

module.exports = jobRouter;
