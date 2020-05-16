const express = require('express');

const documentRouter = express.Router();

const {
  uploadDocument,
} = require('../controller/documentController');

documentRouter.post('/upload', uploadDocument);

module.exports = documentRouter;
