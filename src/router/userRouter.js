const express = require('express');

const userRouter = express.Router();

const { checkAuth } = require('../middleware/UserAuth');


const {
  userSignup,
  login,
} = require('../controller/userController.js');

userRouter.post('/signup', userSignup);
userRouter.post('/login', login);
userRouter.get('/checking', checkAuth, (req, res) => {
  console.log(req.userData);
});

module.exports = userRouter;
