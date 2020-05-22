const express = require('express');

const jobRouter = express.Router();

const {
  checkAuth,
} = require('../middleware/UserAuth');

const {
  createJob,
  viewJob,
  deleteJob,
  editJob,
  applyJob,
} = require('../controller/jobController');

jobRouter.get('/view', checkAuth, viewJob);
jobRouter.post('/create', checkAuth, createJob);
jobRouter.delete('/delete/:id', checkAuth, deleteJob);
jobRouter.patch('/edit/:id', checkAuth, editJob);
jobRouter.patch('/apply/:id', checkAuth, applyJob);

module.exports = jobRouter;
