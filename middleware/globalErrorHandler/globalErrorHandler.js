module.exports.globalErrorHandler = (err, req, res, next) => {
  res.send({
    message: req.message || "Ops! Error Happening. Try again later.",
  });
};
