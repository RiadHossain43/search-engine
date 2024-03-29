const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");
exports.connectDataBase = async () => {
  try {
    mongoose.plugin(mongoosePaginate);
    mongoose.plugin(mongooseAggregatePaginate);
    await mongoose.connect(process.env.MONGO_URI + process.env.DATABASE, {});
    console.log("Database connected");
  } catch (err) {
    console.log(err);
    // Exit process with failure
    process.exit(1);
  }
};
