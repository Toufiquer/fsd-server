/* This middleware is invoke before save the value */
module.exports.__featuresPreMiddleWare = function (next) {
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
};
/* This middleware is invoke after save the value */
module.exports.__featuresPostMiddleWare = function (doc, next) {
  next();
};
