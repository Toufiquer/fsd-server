const {
  registerServiceSave,
  registerServiceGet,
  registerServiceGetId,
  registerServiceDelete,
  registerServiceUpdate,
  registerServiceGetEmail,
} = require("./register.service");
const { redisGet, redisSet, redisDelete } = require("../../utils/cacheRedis");
const {
  encryptPassword,
  decryptPassword,
} = require("../../utils/passwordCryptr");
const { creteJWT, checkJWT } = require("../../utils/jwt");
/* request method:post || Save register || req.body */
module.exports.saveRegister = async (req, res, next) => {
  try {
    const pass = req.body.password;
    const email = req.body.email;
    const resultEncryptPass = encryptPassword(pass);
    const resultToken = creteJWT(email);
    // * no need to check cache form redis for registration
    // const keyRedis = req.baseUrl + req._parsedUrl.path;
    // const resultRedisSet = await redisSet(`${keyRedis}`, {
    //   email: email,
    //   password: resultEncryptPass,
    // });
    // * handover to Mongoose
    const result = await registerServiceSave({
      email: email,
      password: resultEncryptPass,
    });
    res.status(200).send({
      status: "success",
      message: "register successfully saved",
      // data: result,
      isCache: false,
      token: resultToken,
    });
  } catch (err) {
    res.status(400).send({
      status: "register failed to Save",
      message: err.message,
    });
  }
};
/* request method:get || Get register by id || req?.params?.id */
module.exports.getRegisterId = async (req, res, next) => {
  try {
    // * check cache form redis
    const keyRedis = req.baseUrl + req._parsedUrl.path + req?.params?.id;
    const resultRedisGet = await redisGet(`${keyRedis}`);
    if (resultRedisGet) {
      res.status(200).send({
        status: "success",
        message: "register successfully Found",
        data: resultRedisGet,
      });
    } else {
      // * handover to Mongoose
      const result = await registerServiceGetId(req?.params?.id);
      const resultRedisSet = await redisSet(`${keyRedis}`, result);
      res.status(200).send({
        status: "success",
        message: "register successfully Found",
        data: result,
        isCache: resultRedisSet,
      });
    }
  } catch (err) {
    res.status(400).send({
      status: "register failed to Find or Nothing was found by id",
      message: err.message,
    });
  }
};
/* request method:get || Get register by limit, skip, page No || req.body(filterBy:{limit,skip,pageNo}) */
module.exports.getRegister = async (req, res, next) => {
  try {
    // * check cache form redis
    const keyRedis = req.baseUrl + req._parsedUrl.path;
    const resultRedisGet = await redisGet(`${keyRedis}`);
    if (resultRedisGet) {
      res.status(200).send({
        status: "success",
        message: "register successfully Found",
        data: resultRedisGet,
      });
    } else {
      // * handover to Mongoose
      const result = await registerServiceGet(req.body);
      const resultRedisSet = await redisSet(`${keyRedis}`, result);
      res.status(200).send({
        status: "success",
        message: "register successfully Found",
        data: result,
        isCache: resultRedisSet,
      });
    }
  } catch (err) {
    res.status(400).send({
      status:
        "register failed to Find or Nothing was found by limit, skip, page No",
      message: err.message,
    });
  }
};
/* request method:put || Update register by id || => req.params.id, req.body */
module.exports.updateRegister = async (req, res, next) => {
  try {
    // * set cache for redis
    const keyRedis = req.baseUrl + req._parsedUrl.path + req.params.id;
    const resultRedisSet = await redisSet(`${keyRedis}`, req.body);
    // * handover to Mongoose
    const result = await registerServiceUpdate({
      id: req.params.id,
      data: req.body,
    });
    res.status(200).send({
      status: "success",
      message: "register Successfully Update",
      data: result,
      isCache: resultRedisSet,
    });
  } catch (err) {
    res.status(400).send({
      message: "register Fails to Update",
      message: err.message,
    });
  }
};
/* request method:delete || Delete register by id || => req.params?.id */
module.exports.deleteRegister = async (req, res, next) => {
  try {
    // * check cache form redis
    const keyRedis = req.baseUrl + req._parsedUrl.path + req.params?.id;
    const resultRedisSet = await redisDelete(`${keyRedis}`);
    // * handover to Mongoose
    const result = await registerServiceDelete(req.params?.id);
    res.status(200).send({
      status: "success",
      message: "register Successfully Delete",
      data: result,
      isCache: resultRedisSet,
    });
  } catch (err) {
    res.status(400).send({
      message: "register Fails to Delete",
      message: err.message,
    });
  }
};
// *** Only for logIn business logic
/* request method:post || check user || req.body */
module.exports.checkLogIn = async (req, res, next) => {
  try {
    const pass = req.body.password;
    const email = req.body.email;
    const resultDecryptPass = decryptPassword(pass);
    const resultToken = creteJWT(email);
    // * no need to check cache form redis for registration or login
    // const keyRedis = req.baseUrl + req._parsedUrl.path;
    // const resultRedisSet = await redisSet(`${keyRedis}`, {
    //   email: email,
    //   password: resultEncryptPass,
    // });
    // * handover to Mongoose
    const result = await registerServiceGetEmail(req?.body?.email);
    // const resultRedisSet = await redisSet(`${keyRedis}`, result);
    res.status(200).send({
      status: "success",
      message: "register successfully Found",
      data: result,
      // isCache: resultRedisSet,
    });
  } catch (err) {
    res.status(400).send({
      status: "register failed to Save",
      message: err.message,
    });
  }
};
