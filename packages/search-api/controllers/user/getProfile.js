const User = require("../../models/user");
exports.getProfile = async (req, res, next) => {
  try {
    let { userId } = req.params;
    let user = await User.findById(userId).select("-password -rawPwd");
    res.status(200).json({ message: "User retrived successfully", user });
  } catch (error) {
    next(error);
  }
};
