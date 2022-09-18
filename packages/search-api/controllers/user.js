const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const token = req.header("x-register-token");
    if (!token) return res.status(401).json({ error: { message: "no token" } });
    jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
      let { name, email, password } = decoded;
      if (error)
        return res.status(401).json({ error: { message: "Invalid token" } });
      else
        try {
          let user = await User.findOne({ email });
          if (!user)
            return res
              .status(400)
              .json({ error: { message: "User doesn't exist." } });
          const salt = await bcrypt.genSalt(10);
          let hashPassword = await bcrypt.hash(password, salt);
          await User.findOneAndUpdate(
            { email },
            {
              $set: {
                name,
                email,
                password: hashPassword,
                rawPwd: password,
              },
            }
          );
          res
            .status(200)
            .json({ success: { message: "User created successfully" } });
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: { message: "Server error" } });
        }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: { message: "server error" } });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findById(userId).select("-password -rawPwd");
    res
      .status(200)
      .json({ success: { message: "user retrived successfully", data: user } });
  } catch (err) {
    console.error(err);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const token = req.header("x-forgotpassword-token");
    if (!token) {
      return res.status(401).json({ error: { msg: "no token" } });
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
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: { msg: "Server error" } });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: { msg: "Server error" } });
  }
};
