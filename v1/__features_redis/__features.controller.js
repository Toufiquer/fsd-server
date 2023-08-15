const {
  __featuresServiceSave,
  __featuresServiceGet,
  __featuresServiceGetId,
  __featuresServiceDelete,
  __featuresServiceUpdate,
} = require("./__features.service");
const { redisGet, redisSet, redisDelete } = require("./../../utils/cacheRedis");
/* request method:post || Save _Features || req.body */
module.exports.save_Features = async (req, res, next) => {
  try {
    // * check cache form redis
    const keyRedis = req.baseUrl + req._parsedUrl.path;
    const resultRedisSet = await redisSet(`${keyRedis}`, req.body);
    // * handover to Mongoose
    const result = await __featuresServiceSave(req.body);
    res.status(200).send({
      status: "success",
      message: "_Features successfully saved",
      data: result,
      isCache: resultRedisSet,
    });
  } catch (err) {
    res.status(400).send({
      status: "_Features failed to Save",
      message: err.message,
    });
  }
};
/* request method:get || Get _Features by id || req?.params?.id */
module.exports.get_FeaturesId = async (req, res, next) => {
  try {
    // * check cache form redis
    const keyRedis = req.baseUrl + req._parsedUrl.path + req?.params?.id;
    const resultRedisGet = await redisGet(`${keyRedis}`);
    if (resultRedisGet) {
      res.status(200).send({
        status: "success",
        message: "_Features successfully Found",
        data: resultRedisGet,
      });
    } else {
      // * handover to Mongoose
      const result = await __featuresServiceGetId(req?.params?.id);
      const resultRedisSet = await redisSet(`${keyRedis}`, result);
      res.status(200).send({
        status: "success",
        message: "_Features successfully Found",
        data: result,
        isCache: resultRedisSet,
      });
    }
  } catch (err) {
    res.status(400).send({
      status: "_Features failed to Find or Nothing was found by id",
      message: err.message,
    });
  }
};
/* request method:get || Get _Features by limit, skip, page No || req.body(filterBy:{limit,skip,pageNo}) */
module.exports.get_Features = async (req, res, next) => {
  try {
    // * check cache form redis
    const keyRedis = req.baseUrl + req._parsedUrl.path;
    const resultRedisGet = await redisGet(`${keyRedis}`);
    if (resultRedisGet) {
      res.status(200).send({
        status: "success",
        message: "_Features successfully Found",
        data: resultRedisGet,
      });
    } else {
      // * handover to Mongoose
      const result = await __featuresServiceGet(req.body);
      const resultRedisSet = await redisSet(`${keyRedis}`, result);
      res.status(200).send({
        status: "success",
        message: "_Features successfully Found",
        data: result,
        isCache: resultRedisSet,
      });
    }
  } catch (err) {
    res.status(400).send({
      status:
        "_Features failed to Find or Nothing was found by limit, skip, page No",
      message: err.message,
    });
  }
};
/* request method:put || Update _Features by id || => req.params.id, req.body */
module.exports.update_Features = async (req, res, next) => {
  try {
    // * set cache for redis
    const keyRedis = req.baseUrl + req._parsedUrl.path + req.params.id;
    const resultRedisSet = await redisSet(`${keyRedis}`, req.body);
    // * handover to Mongoose
    const result = await __featuresServiceUpdate({
      id: req.params.id,
      data: req.body,
    });
    res.status(200).send({
      status: "success",
      message: "_Features Successfully Update",
      data: result,
      isCache: resultRedisSet,
    });
  } catch (err) {
    res.status(400).send({
      message: "_Features Fails to Update",
      message: err.message,
    });
  }
};
/* request method:delete || Delete _Features by id || => req.params?.id */
module.exports.delete_Features = async (req, res, next) => {
  try {
    // * check cache form redis
    const keyRedis = req.baseUrl + req._parsedUrl.path + req.params?.id;
    const resultRedisSet = await redisDelete(`${keyRedis}`);
    // * handover to Mongoose
    const result = await __featuresServiceDelete(req.params?.id);
    res.status(200).send({
      status: "success",
      message: "_Features Successfully Delete",
      data: result,
      isCache: resultRedisSet,
    });
  } catch (err) {
    res.status(400).send({
      message: "_Features Fails to Delete",
      message: err.message,
    });
  }
};
