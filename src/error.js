const notFound = (req, res, next) => {
  const error = new Error(`Not Found :- ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHanlder = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error,
  });
};

module.exports = { notFound, errorHanlder };
