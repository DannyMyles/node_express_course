const errorHandlerMiddleware = (err, req, res) => {
  return res.status(err.status || 500).json({
    msg: err.message,
  });
};
module.exports = errorHandlerMiddleware;