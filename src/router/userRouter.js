const express = require('express');

const userRouter = express.Router();

const {
  checkAuth,
} = require('../middleware/UserAuth');


const {
  userSignup,
  login,
} = require('../controller/userController.js');

userRouter.post('/signup', userSignup);
userRouter.post('/login', checkAuth, login);


module.exports = userRouter;
