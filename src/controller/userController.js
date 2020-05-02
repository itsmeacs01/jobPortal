const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const User = require('../model/User');

exports.userSignup = async (req, res, next) => {
  try {
    const validationSchema = joi.object({
      fullName: joi.string().trim().required(),
      password: joi.string().trim().min(8),
      email: joi.string().trim().email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net'],
        },
      }),
      phoneNumber: joi.string().trim().max(10).min(10),
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
      } = req.body;
      const checkUser = await User.findOne({
        $or: [{
          email,
        }, {
          phoneNumber,
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
