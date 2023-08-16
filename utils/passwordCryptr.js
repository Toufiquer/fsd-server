const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

module.exports.encryptPassword = (password) => {
  const result = cryptr.encrypt(password);
  return result;
};
module.exports.decryptPassword = (encryptPassword) => {
  const result = cryptr.decrypt(encryptPassword);
  return result;
};
