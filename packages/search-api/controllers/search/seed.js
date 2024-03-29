const Company = require("../../models/company");
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
    const createdData = await Company.create({
      name,
      founder,
      description,
      website,
      officialEmail,
      telephone,
      address,
      evaluation,
      employees,
    });
    res.status(200).json({
      message: "Data create success.",
      company: createdData,
    });
  } catch (error) {
    next(error);
  }
};
