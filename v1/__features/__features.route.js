const express = require("express");
const router = express.Router();
const __featuresRouter = require("./__features.controller");
router
  .route("/")
  .get(__featuresRouter.get_Features)
  .post(__featuresRouter.save_Features);

//  * if has an id
router
  .route("/:id")
  .get(__featuresRouter.get_FeaturesId)
  .put(__featuresRouter.update_Features)
  .delete(__featuresRouter.delete_Features);
module.exports = router;

/**
 * * Response Structure
 * @ if success
{
    status: "success",
    message: "_Features successfully [get | saved | update | delete]",
    data: result (actual data)
}
 * @ if failed
{
    status: "_Features failed to Save",
    message: err.message,
}
 * */
