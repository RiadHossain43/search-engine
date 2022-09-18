const { trimQuery } = require("../utils/trimQuery");
exports.sanitizeQuery = async (req, res, next) => {
  req.query = trimQuery(req.query);
  next();
};
