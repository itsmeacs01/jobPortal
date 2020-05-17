const jwt = require('jsonwebtoken');

const User = require('../model/User');

exports.checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    if (token) {
      const verifyToken = await jwt.verify(token, process.env.SECRET);
      console.log(verifyToken)
      if (verifyToken) {
        const checkUser = await User.findOne({
          _id: verifyToken.id,
        });
        if (checkUser) {
          req.userData = checkUser;
          next();
        }
        if (!checkUser) {
          res.status(409).json({
            message: 'Authentication Error',
          });
        }
      }
      if (!verifyToken) {
        res.status(409).json({
          message: 'invalid token',
        });
      }
    }
    if (!token) {
      res.status(404).json({
        message: 'invalid token',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.employersAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      const verifyToken = jwt.verify(token, process.env.SECRET);
      if (verifyToken) {
        const checkUser = await User.findOne({
          _id: verifyToken.id,
        });
        if (checkUser) {
          req.userData = checkUser;
          if (req.userData.userRole === 'employers') {
            next();
          }
          if (!req.userData.userRole === 'employers') {
            res.status(409).json({
              message: 'Authentication Error',
            });
          }
        }
        if (!checkUser) {
          res.ststus(409).json({
            message: 'Authentication Error',
          });
        }
      }
    }
    if (!token) {
      res.status(404).json({
        message: 'invalid token',
      });
    }
  } catch (error) {
    next(error);
  }
};
