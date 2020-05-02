const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({

  documentName: {
    type: String,
    required: true,
  },
  documentType: {
    type: String,
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  employeeId: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },

});
module.exports = mongoose.model('Document', documentSchema);
