const jwt = require('jsonwebtoken');
const User = require('../model/User');

const {
  SECRET,
} = process.env;

exports.verifyUser = async (req, res, next) => {
  try {
    const {
      usernameOrEmail,
    } = req.body;
    const data = usernameOrEmail.trim();
    const isUser = await User.findOne({
      $or: [{
        email: data,
      }, {
        username: data,
      }],
    });
    if (!isUser) {
      res.status(409).json({
        message: 'Invalid Email or Password',
      });
    }
    if (isUser && (isUser.userRole === 'employer' || isUser.userRole === 'employers')) {
      req.userInfo = isUser;
      next();
    }
    if (isUser && !isUser.userRole) {
      res.status(409).json({
        message: 'Unauthorizer User',
      });
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
};

exports.userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      const decode = await jwt.verify(token, SECRET);
      if (decode) {
        req.userInfo = decode;
        next();
      }
    }
    if (!token) {
      res.status(409).json({
        message: 'authentication error',
      });
    }
  } catch (error) {
    res.status(409).json({
      message: 'UnAuthorized',
    });
  }
};
