const express = require('express');

const userRouter = express.Router();


const {
  userSignup,
  login,
} = require('../controller/userController.js');

userRouter.post('/signup', userSignup);
userRouter.post('/login', login);

module.exports = userRouter;
