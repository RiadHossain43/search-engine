const ErrorHandler = require("../services/error/errorHandler");
const actionOnUnhandled = () => {
  process.on("unhandledRejection", (error, promise) => {
    console.log("***handling unhandled rejection***");
    let errorHandler = new ErrorHandler(error);
    errorHandler.handleError();
  });
  process.on("uncaughtException", (error) => {
    console.log("***handling unhandled exception***");
    let errorHandler = new ErrorHandler(error);
    errorHandler.handleError();
  });
};
module.exports = {
  actionOnUnhandled,
};
