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
      const {
        selectedDocument,
      } = req.files;
      const {
        id,
      } = req.userData;
      const documentTypeOf = [
        // image extensions
        'image/jpeg',
        'image/jepg',
        'image/png',
        'image/webp',
        // pdf extensions
        'application/pdf',
        'application/x-pdf',
        // wordfile extensions
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        'application/vnd.openxmlformats-officedocument.wordprocessing',
        'application/vnd.oasis.opendocument.text',
      ];
      if (documentTypeOf.includes(selectedDocument.mimetype)) {
        const name = Date.now() + selectedDocument.name;
        selectedDocument.name = name;
        const documentData = new Document({
          userId: id,
          document: selectedDocument,
        });
        const saveDocumentData = await documentData.save();
        if (saveDocumentData) {
          selectedDocument.mv(path.resolve(__dirname, '../../uploads', selectedDocument.name), (err) => {
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
      }
      if (!documentTypeOf.includes(selectedDocument.mimetype)) {
        res.status(422).json({
          message: 'Invalid file format',
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
