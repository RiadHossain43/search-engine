const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../mail/mailService");
const User = require("../models/user");

exports.loginAndGetToken = async (req, res) => {
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
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: { message: "Server error" } });
  }
};

exports.validateRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ error: { message: "This user is already taken." } });
    let payload = {
      name,
      email,
      password,
    };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: 600 },
      async (err, token) => {
        if (err) throw err;
        try {
          // send email to the person here ...
          let newUser = new User({ name, email, password });
          await newUser.save();
          let confirmationLink = `http://localhost:3000/activate-account/${token}`;
          await sendMail("varify-yourself", email, { name, confirmationLink });
          res.status(200).json({ token });
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: { message: "Try again" } });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: { message: "server error" } });
  }
};
exports.forgotPassword = async (req, res) => {
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
      async (err, token) => {
        if (err) throw err;
        try {
          // send email to user ...
          res
            .status(200)
            .json({ success: { message: "email sent", data: token } });
        } catch (err) {
          res.status(500).json({ error: { message: "Try agian" } });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: "server error" } });
  }
};
