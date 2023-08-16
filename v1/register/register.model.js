const mongoose = require("mongoose");
const { registerSchema } = require("./register.schema");
module.exports.registerModel = mongoose.model("register", registerSchema);
/**
 * * Just create a model using schema and export it
 */
