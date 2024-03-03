const notFound = (req, res, next) => {
  const error = new Error(`Not Found = ${req.originalUrl}`);
  res.status(404);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  // jika status code tidak dimasukan
  let statusCode = req.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;

  if (err.errors || err.name == "SequelizeValidationError") {
    const errorListen = err.errors.map((err) => {
      let obj = {};
      obj[err.path] == err.message;
      return obj;
    });
    console.log(err);
    message = err.errors[0].message;
    statusCode = 400;
  }

  console.log(message);

  res.status(statusCode).json({
    message,
    stack: err.stack,
  });
};

module.exports = { errorHandler, notFound };
