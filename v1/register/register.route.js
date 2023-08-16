const express = require("express");
const router = express.Router();
const registerRouter = require("./register.controller");
router
  .route("/")
  .get(registerRouter.getRegister)
  .post(registerRouter.saveRegister);

//  * if has an id
router
  .route("/:id")
  .get(registerRouter.getRegisterId)
  .put(registerRouter.updateRegister)
  .delete(registerRouter.deleteRegister);
module.exports = router;

/**
 * * Response Structure
 * @ if success
{
    status: "success",
    message: "register successfully [get | saved | update | delete]",
    data: result
}
 * @ if failed
{
    status: "register failed to Save",
    message: err.message,
}
 * */
