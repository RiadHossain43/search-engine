const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ error: { message: "User does not exist." } });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ error: { message: "Invalid credentials." } });
    user = await User.findOne({ email }).select("-password");
    const payload = { user };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: "5 days" },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    next(error);
  }
};
