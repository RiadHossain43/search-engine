const router = require("express").Router();
const {
  login,
  startAccountVerification,
  register,
  forgotPassword,
  resetPassword
} = require("../../controllers/auth");

router.post("/login", [], login);
router.post("/account-verification", [], startAccountVerification);
router.post("/register", [], register);
router.post("/forgot-password", [], forgotPassword);
router.post("/reset-password", [], resetPassword);

module.exports = router;
