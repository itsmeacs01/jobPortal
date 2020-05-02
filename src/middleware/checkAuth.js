// const jwt = require('jsonwebtoken');

// exports.checkAuth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, 'this is private key sadsad');
//     next();
//   } catch (err) {
//     res.status(401).json({
//       message: 'auth failed',
//     });
//   }
// };
