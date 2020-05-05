const express = require('express');

const { userSignup, login } = require('../controller/userController.js');

const userRouter = express.Router();

userRouter.post('/signup', userSignup);
userRouter.post('/login', login);

module.exports = userRouter;
