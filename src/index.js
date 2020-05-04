const express = require('express');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const volleyball = require('volleyball');

const app = express();

const {
  PORT,
  ORIGIN,
} = process.env;

app.listen(PORT, () => {
// eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${PORT}`);
});
app.use(cors({
  origin: ORIGIN,
}));

// Database Connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // eslint-disable-next-line no-console
  console.log('Database connected successfully.');
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
  // eslint-disable-next-line no-console
  console.log('Database connection failed.');
});
const userRouter = require('./router/userRouter');

app.use(express.json());
app.use(volleyball);

app.use('/', userRouter);

// job handler
const jobRouter = require('./router/jobRouter');

app.use('/job', jobRouter);

const { notFound, errorHanlder } = require('./error');

app.use(notFound);
app.use(errorHanlder);
