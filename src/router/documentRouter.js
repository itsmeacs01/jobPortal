const express = require('express');

const documentRouter = express.Router();
const {
  checkAuth,

} = require('../middleware/UserAuth');
const {
  uploadDocument,
} = require('../controller/documentController');

documentRouter.post('/upload', checkAuth, uploadDocument);

module.exports = documentRouter;
