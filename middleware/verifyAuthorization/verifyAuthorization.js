const { checkJWT } = require("../../utils/jwt");
module.exports.verifyAuthorization = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    res.send({
      isError: true,
      message: "Please give access token",
    });
  } else {
    let resultTtk = checkJWT(token);
    const sessionTime = resultTtk;
    const currentTime = new Date();

    console.log(sessionTime, currentTime, " => Line No: 23");
    next();
  }
};
