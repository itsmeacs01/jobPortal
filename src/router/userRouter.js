const express = require('express');

const userRouter = express.Router();

const {
  checkAuth,
} = require('../middleware/UserAuth');

const {
  userSignup,
  login,
  deleteUser,
  forgotPassword,
  confirmPassword,
} = require('../controller/userController.js');

userRouter.post('/signup', userSignup);
userRouter.post('/login', login);
userRouter.delete('/user/delete/:id', checkAuth, deleteUser);
userRouter.post('/forgot/password', forgotPassword);
userRouter.patch('/confirm/password/:token', confirmPassword);
module.exports = userRouter;
