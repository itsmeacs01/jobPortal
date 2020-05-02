const express = require('express');

const { userSignup } = require('../controller/userController.js');

const userRouter = express.Router();

userRouter.post('/signup', userSignup);

module.exports = userRouter;
