const express = require('express');

const jobRouter = express.Router();

const {
  checkAuth,
  employersAuth,
} = require('../middleware/UserAuth');

const {
  createJob,
  viewJob,
  deleteJob,
  editJob,
} = require('../controller/jobController');

jobRouter.get('/view', checkAuth, viewJob);
jobRouter.post('/create', employersAuth, createJob);
jobRouter.delete('/delete/:id', employersAuth, deleteJob);
jobRouter.patch('/edit/:id', employersAuth, editJob);

module.exports = jobRouter;
