const jwt = require("jsonwebtoken");
const User = require("../../models/user");

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email }).select("-password");
    if (!user)
      return res.status(400).json({ error: { message: "Invalid email" } });
    const payload = { user };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: 600 },
      async (error, token) => {
        if (error) throw error;
        try {
          // send email to user ...
          res.status(200).json({ message: "Email sent", data: token });
        } catch (error) {
          next(error);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
