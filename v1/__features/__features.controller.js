const {
  __featuresServiceSave,
  __featuresServiceGet,
  __featuresServiceGetId,
  __featuresServiceDelete,
  __featuresServiceUpdate,
} = require("./__features.service");

/* request method:post || Save _Features || req.body */
module.exports.save_Features = async (req, res, next) => {
  try {
    const result = await __featuresServiceSave(req.body);
    res.status(200).send({
      status: "success",
      message: "_Features successfully saved",
      data: result,
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
    const result = await __featuresServiceGetId(req?.params?.id);
    res.status(200).send({
      status: "success",
      message: "_Features successfully Found",
      data: result,
    });
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
    const result = await __featuresServiceGet(req.body);
    res.status(200).send({
      status: "success",
      message: "_Features successfully Found",
      data: result,
    });
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
    const result = await __featuresServiceUpdate({
      id: req.params.id,
      data: req.body,
    });
    res.status(200).send({
      status: "success",
      message: "_Features Successfully Update",
      data: result,
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
    const result = await __featuresServiceDelete(req.params?.id);
    res.status(200).send({
      status: "success",
      message: "_Features Successfully Delete",
      data: result,
    });
  } catch (err) {
    res.status(400).send({
      message: "_Features Fails to Delete",
      message: err.message,
    });
  }
};
