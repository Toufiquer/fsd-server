var jwt = require("jsonwebtoken");

module.exports.creteJWT = (email) => {
  const result = jwt.sign(
    { email, iat: Math.floor(Date.now() / 1000) - 30 },
    process.env.CRYPTR_KEY
  );
  return result;
};
module.exports.checkJWT = (token) => {
  // verify a token symmetric - synchronous
  return jwt.verify(token, process.env.CRYPTR_KEY, function (err, decoded) {
    const result = { err, decoded };
    console.log(result, " => Line No: 14");
    return result;
  });
};
