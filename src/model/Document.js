const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  document: {
    type: Object,
  },
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },

});
module.exports = mongoose.model('Document', documentSchema);
