const Company = require("../models/company");
const { asynchronously } = require("../utils/async");
const { Filters } = require("../utils/filters");
const { fomatPagination } = require("../utils/formats");

exports.getResults = async (req, res) => {
  let { page, sort, size } = req.query;
  const options = { page, limit: size, sort: "name" };
  let filter = new Filters(req.query, { searchFields: ["name"] })
    .build()
    .query();
  let query = { ...filter };
  const [error, queryResults] = await asynchronously(
    Company.paginate(query, options)
  );
  res.status(200).json({
    message: "Data retrival success.",
    results: queryResults.docs,
    pagination: fomatPagination(queryResults),
    statusCode: 200,
  });
};
exports.seed = async (req, res) => {
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
  const [error, createdData] = await asynchronously(
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
};
