const express = require('express');

const userRouter = express.Router();

const {
  checkAuth,
} = require('../middleware/UserAuth')

const {
  userSignup,
  login,
  deleteUser,
} = require('../controller/userController.js');

userRouter.post('/signup', userSignup);
userRouter.post('/login', login);
userRouter.delete('/user/delete/:id', checkAuth, deleteUser);

module.exports = userRouter;
