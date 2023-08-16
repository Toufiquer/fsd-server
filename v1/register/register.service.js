const { registerModel } = require("./register.model");
/* Mongoose business logic */
module.exports.registerServiceSave = async (data) => {
  // @ save
  // const register = new registerModel(data);
  // $ do any thing before save
  // const result = await register.save();
  // @ create
  const result = await registerModel.create({ ...data });
  // result.logger();
  return result;
};
module.exports.registerServiceGetId = async (id) => {
  // @ find one
  const result = await registerModel.findOne({ _id: id });
  // @ find a doc
  // const result = await registerModel.find({id: "1234..."});
  // const result = await registerModel.findById("1234");
  // @ find all doc $or
  // const result = await registerModel.find({$or: [{id: "123"},{name: "name"}]});
  // const result = await registerModel.find({},{name,quantity});
  // @ find all doc $ne
  // const result = await registerModel.find({},{-name,-quantity});
  //  * all can add .find.skip().limit()
  //  * all can add .find.sort({quantity: -1})

  // @ find all doc chaining
  //   const result = await registerModel
  //     .where("name")
  //     .equals(/\w/)
  //     .where("quantity")
  //     .length(2)
  //     .lt(1000)
  //     .limit(2)
  //     .sort({ quantity: -1 });

  return result;
};
module.exports.registerServiceGet = async (id) => {
  // @ find a doc
  // const result = await registerModel.find({id: "1234..."});
  // const result = await registerModel.findById("1234");
  // @ find all doc $or
  // const result = await registerModel.find({$or: [{id: "123"},{name: "name"}]});
  // const result = await registerModel.find({},{name,quantity});
  // @ find all doc $ne
  // const result = await registerModel.find({},{-name,-quantity});
  //  * all can add .find.skip().limit()
  //  * all can add .find.sort({quantity: -1})

  // @ find all doc chaining
  //   const result = await registerModel
  //     .where("name")
  //     .equals(/\w/)
  //     .where("quantity")
  //     .length(2)
  //     .lt(1000)
  //     .limit(2)
  //     .sort({ quantity: -1 });
  // @ find all
  const { limit = 10, skip = 0, pageNo = 1 } = data.body?.filterBy || {};
  const result = await registerModel
    .find({})
    .limit(limit)
    .skip(skip * pageNo);
  return result;
};
module.exports.registerServiceUpdate = async ({ id, data }) => {
  // @ update a register
  const query = { _id: id };
  const update = { $set: { ...data } };
  const options = {
    new: true,
  };
  const result = await registerModel.findOneAndUpdate(query, update, options);
  return result;
};
module.exports.registerServiceDelete = async (id) => {
  // @ delete a register
  const result = await registerModel.deleteOne({ _id: id });
  return result;
};
