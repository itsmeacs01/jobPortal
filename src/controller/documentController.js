const path = require('path');

const Document = require('../model/Document');

exports.uploadDocument = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({
        message: 'No file were found',
      });
    }
    if (req.files) {
      const { selectedDocument } = req.files;

      const documentType = [
        // image extensions
        'image/jpg',
        'image/jepg',
        'image/png',
        'image/webp',
        // pdf extensions
        'application/pdf',
        'application/x-pdf',
        // wordfile extensions
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessing',
        'text/plain',
        'application/vnd.oasis.opendocument.text',
      ];
      if (!documentType.includes(selectedDocument.mimetype)) {
        res.status(422).json({
          message: 'Invalid file format',
        });
      }
      const uploadDocument = await selectedDocument.mv(path.resolve(__dirname, '../../uploads', selectedDocument.name), (err) => {
        if (err) {
          res.status(400).json({
            message: 'unable to upload document',
          });
        } else {
          res.status(200).json({
            message: 'Document uploaded successfully',
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
