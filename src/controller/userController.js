const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');

exports.userSignup = async (req, res, next) => {
  try {
    const validationSchema = joi.object({
      fullName: joi.string().trim().required(),
      username: joi.string().trim().required(),
      password: joi.string().min(8),
      email: joi.string().trim().email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'np'],
        },
      }),
      phoneNumber: joi.string().max(10).min(10),
      userRole: joi.string().trim(),
    });
    const validate = await validationSchema.validateAsync(req.body);
    if (validate) {
      const {
        fullName,
        email,
        password,
        phoneNumber,
        userRole,
        username,
      } = req.body;
      const checkUser = await User.findOne({
        $or: [{
          email,
        }, {
          phoneNumber,
        }, {
          username,
        }],
      });
      if (checkUser) {
        res.status(409).json({
          message: 'User already exists, please login',
        });
      }
      if (!checkUser) {
        const hash = await bcrypt.hashSync(password, 12);
        const userData = new User({
          fullName,
          email,
          password: hash,
          phoneNumber,
          userRole,
          username,
        });
        const saveData = await userData.save();
        if (saveData) {
          res.status(200).json({
            message: 'User created successfully',
          });
        }
      }
    }
  } catch (error) {
    if (error.name === 'ValdationError') {
      res.status(422);
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const {
      usernameOrEmail,
      password,
    } = req.body;
    const checkUser = await User.findOne({
      $or: [{
        username: usernameOrEmail,
      }, {
        email: usernameOrEmail,
      }],
    });
    if (checkUser) {
      const checkPassword = await bcrypt.compareSync(password, checkUser.password);
      if (checkPassword) {
        const token = await jwt.sign({
          id: checkUser.id,
          email: checkUser.email,
        }, process.env.SECRET, {
          expiresIn: '24h',
        });
        if (token) {
          res.status(200).json({
            message: 'Logged in successfully',
            token,
          });
        }
      }
      if (!checkPassword) {
        res.status(400).json({
          message: 'Invalid email or password',
        });
      }
    }
    if (!checkUser) {
      res.status(400).json({
        messsage: 'Invalid email or password',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const {
      id,
    } = req.params;
    const findUser = await User.findOne({
      _id: id,
    });
    if (findUser) {
      const userId = req.userData.id;
      if (userId === id) {
        const {
          password,
        } = req.body;
        const userPassword = req.userData.password;
        const verifyUser = await bcrypt.compareSync(password, userPassword);
        if (verifyUser) {
          const removeUser = await User.findOneAndDelete({
            _id: id,
          });
          if (removeUser) {
            res.status(200).json({
              message: 'user deleted successfully',
            });
          }
        }
        if (!verifyUser) {
          res.status(401).json({
            message: 'unauthorized user',
          });
        }
      } else {
        res.status(401).json({
          message: 'unauthorized user',
        });
      }
    }
    if (!findUser) {
      res.status(400).json({
        message: 'user do not exists!',
      });
    }
  } catch (error) {
    next(error);
  }
};
