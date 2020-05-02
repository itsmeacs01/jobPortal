// const jwt = require('jsonwebtoken');

// exports.userAuth = async (req, res, next) => {
//   try {
//     const token = await req.headers.authorization.split(' ')[1];
//     // console.log(token);
//     const userInfo = await jwt.verify(token, process.env.SECRET);
//     req.userData = userInfo;
//     const email = userInfo.email
//     const _id = userInfo._id

//     next();
//   } catch (err) {
//     res.status(401).json({
//       message: 'auth failed here',
//     });
//   }
// };
