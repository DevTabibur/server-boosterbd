const errorHandler = (err, req, res, next) => {
  res.status(400).json({
    status: "failed",
    code: 400,
    message: "Something went wrong",
    error: err.message,
  });
};
module.exports = errorHandler;
