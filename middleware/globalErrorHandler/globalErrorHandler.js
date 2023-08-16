module.exports.globalErrorHandler = (err, req, res, next) => {
  res.send({
    isError: true,
    message: req.message || "Ops! Error Happening. Try again later.",
  });
};
