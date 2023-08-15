const mongoose = require("mongoose");
const { __featuresSchema } = require("./__features.schema");
module.exports.__featuresModel = mongoose.model("_Features", __featuresSchema);
/**
 * * Just create a model using schema and export it
 */ 