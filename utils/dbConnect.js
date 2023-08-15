const mongoose = require("mongoose");

/* To Connect with mongoDb & update .env.DATABASE */
module.exports.DBConnect = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log("mongoose is connected");
      });
  } catch (error) {
    console.log(error.message);
  }
};
