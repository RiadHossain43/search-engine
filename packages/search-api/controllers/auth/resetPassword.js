const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const token = req.header("x-resetpassword-token");
    if (!token) {
      return res.status(401).json({ error: { msg: "No token" } });
    }
    jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        try {
          const salt = await bcrypt.genSalt(10);
          let hashPassword = await bcrypt.hash(password, salt);
          await User.findOneAndUpdate(
            { _id: decoded.id },
            { $set: { password: hashPassword, resetToken: "" } }
          );
          res.status(200).json({ success: { message: "Reset successfull" } });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: { msg: "Server error" } });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
