const jwt = require("jsonwebtoken");
const { sendMail } = require("../../services/mail/mailService");
const User = require("../../models/user");
exports.startAccountVerification = async (req, res, next) => {
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
      async (error, token) => {
        if (error) throw error;
        try {
          // send email to the person here ...
          await User.create({ name, email, password });
          let confirmationLink = `http://localhost:3000/activate-account/${token}`;
          await sendMail("varify-yourself", email, { name, confirmationLink });
          res.status(200).json({ token });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: { message: "Try again" } });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
