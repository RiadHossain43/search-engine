const { StatusCodes, ReasonPhrases } = require("http-status-codes");
class ErroHandler {
  constructor(error) {
    this.error = error;
  }
  handleError() {
    console.info(
      "logging error handler: ******************************************"
    );
    console.error(this.error);
    console.info(
      "*****************************************************************"
    );
  }
  prepareHTTPResponse() {}
}
module.exports = ErroHandler;
