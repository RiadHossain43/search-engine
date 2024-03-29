const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    const token = req.header("x-register-token");
    if (!token) return res.status(401).json({ error: { message: "No token" } });
    jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
      let { name, email, password } = decoded;
      if (error)
        return res.status(401).json({ error: { message: "Invalid token" } });
      else {
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
      }
    });
  } catch (error) {
    next(error);
  }
};
