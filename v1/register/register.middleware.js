/* This middleware is invoke before save the value */
module.exports.registerPreMiddleWare = function (next) {
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
};
/* This middleware is invoke after save the value */
module.exports.registerPostMiddleWare = function (doc, next) {
  next();
};
