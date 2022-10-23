const Company = require("../models/company");
const { asynchronously } = require("../utils/async");
const { Filters } = require("../utils/filters");
const { formatPagination } = require("../utils/formats");

exports.getResults = async (req, res, next) => {
  let { page, sort, size } = req.query;
  const options = { page, limit: size, sort };
  let filter = new Filters(req.query, { searchFields: ["name"] })
    .build()
    .query();
  let query = { ...filter };
  try {
    const queryResults = await Company.paginate(query, options);
    res.status(200).json({
      message: "Data retrival success.",
      results: queryResults.docs,
      pagination: formatPagination(queryResults),
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
exports.seed = async (req, res, next) => {
  let {
    name,
    founder,
    description,
    website,
    officialEmail,
    telephone,
    address,
    evaluation,
    employees,
  } = req.body;
  try {
    const createdData = await asynchronously(
      Company.create({
        name,
        founder,
        description,
        website,
        officialEmail,
        telephone,
        address,
        evaluation,
        employees,
      })
    );
    res.status(200).json({
      message: "Data create success.",
      company: createdData,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
