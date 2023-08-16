const mongoose = require("mongoose");
const {
  registerPreMiddleWare,
  registerPostMiddleWare,
} = require("./register.middleware");
const registerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Please provide a email for this register"],
      trim: true,
      unique: true,
      minLength: [3, "Name required at list 3 letter"],
    },
    password: {
      type: String,
      require: [true, "Please provide a email for this register"],
      trim: true,
      unique: true,
      minLength: [3, "Name required at list 3 letter"],
    },
  },
  {
    timestamps: true,
  }
);

// * middleware
/* This middleware is invoke before and after save the value */
registerSchema.pre("save", registerPreMiddleWare);
registerSchema.post("save", registerPostMiddleWare);

// * static method
// you can call this method from controller
registerSchema.methods.logger = function () {};

module.exports.registerSchema = registerSchema;
