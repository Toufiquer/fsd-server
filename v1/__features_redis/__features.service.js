const { __featuresModel } = require("./__features.model");
/* Mongoose business logic */ 
module.exports.__featuresServiceSave = async (data) => {
  // @ save
  // const __features = new __featuresModel(data);
  // $ do any thing before save
  // const result = await __features.save();
  // @ create
  const result = await __featuresModel.create({ ...data });
  // result.logger();
  return result;
};
module.exports.__featuresServiceGetId = async (id) => {
  // @ find one
  const result = await __featuresModel.findOne({ _id: id });
  // @ find a doc
  // const result = await __featuresModel.find({id: "1234..."});
  // const result = await __featuresModel.findById("1234");
  // @ find all doc $or
  // const result = await __featuresModel.find({$or: [{id: "123"},{name: "name"}]});
  // const result = await __featuresModel.find({},{name,quantity});
  // @ find all doc $ne
  // const result = await __featuresModel.find({},{-name,-quantity});
  //  * all can add .find.skip().limit()
  //  * all can add .find.sort({quantity: -1})

  // @ find all doc chaining
  //   const result = await __featuresModel
  //     .where("name")
  //     .equals(/\w/)
  //     .where("quantity")
  //     .length(2)
  //     .lt(1000)
  //     .limit(2)
  //     .sort({ quantity: -1 });

  return result;
};
module.exports.__featuresServiceGet = async (id) => {
  // @ find a doc
  // const result = await __featuresModel.find({id: "1234..."});
  // const result = await __featuresModel.findById("1234");
  // @ find all doc $or
  // const result = await __featuresModel.find({$or: [{id: "123"},{name: "name"}]});
  // const result = await __featuresModel.find({},{name,quantity});
  // @ find all doc $ne
  // const result = await __featuresModel.find({},{-name,-quantity});
  //  * all can add .find.skip().limit()
  //  * all can add .find.sort({quantity: -1})

  // @ find all doc chaining
  //   const result = await __featuresModel
  //     .where("name")
  //     .equals(/\w/)
  //     .where("quantity")
  //     .length(2)
  //     .lt(1000)
  //     .limit(2)
  //     .sort({ quantity: -1 });
  // @ find all
  const { limit = 10, skip = 0, pageNo = 1 } = data.body?.filterBy || {};
  const result = await __featuresModel
    .find({})
    .limit(limit)
    .skip(skip * pageNo);
  return result;
};
module.exports.__featuresServiceUpdate = async ({ id, data }) => {
  // @ update a __features
  const query = { _id: id };
  const update = { $set: { ...data } };
  const options = {
    new: true,
  };
  const result = await __featuresModel.findOneAndUpdate(query, update, options);
  return result;
};
module.exports.__featuresServiceDelete = async (id) => {
  // @ delete a __features
  const result = await __featuresModel.deleteOne({ _id: id });
  return result;
};
