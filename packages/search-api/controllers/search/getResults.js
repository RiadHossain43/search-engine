const Company = require("../../models/company");
const { Filters } = require("../../utils/filters");
const { formatPagination } = require("../../utils/formats");

exports.getResults = async (req, res, next) => {
  let { page, sort, size } = req.query;
  const options = { page, limit: size, sort };
  // let filter = new Filters(req.query, { searchFields: ["name"] })
  //   .build()
  //   .query();
  // let query = { ...filter };
  try {
    const pipeline = Company.aggregate();
    const queryResults = await Company.aggregatePaginate(pipeline, options);
    console.log(queryResults)
    res.status(200).json({
      message: "Data retrival success.",
      results: queryResults.docs,
      pagination: formatPagination(queryResults),
    });
  } catch (error) {
    next(error);
  }
};
