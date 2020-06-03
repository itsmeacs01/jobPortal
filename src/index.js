/* eslint-disable no-console */

const express = require('express');
const cors = require('cors');

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const volleyball = require('volleyball');
const expressFileUpload = require('express-fileupload');

const app = express();

const {
  PORT,
  ORIGIN,
} = process.env;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
app.use(cors());

// Database Connection

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected successfully.');
}).catch((err) => {
  console.log(err);
  console.log('Database connection failed.');
});

const userRouter = require('./router/userRouter');
const jobRouter = require('./router/jobRouter');
// const adminRouter = require('./router/adminRouter');
const documentRouter = require('./router/documentRouter');

app.use(express.json());
app.use(volleyball);
app.use(expressFileUpload());

app.use('/', userRouter);
app.use('/job', jobRouter);
// app.use('/admin', adminRouter);
app.use('/document', documentRouter);

const { notFound, errorHanlder } = require('./error');

app.use(notFound);
app.use(errorHanlder);
