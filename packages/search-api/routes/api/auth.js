const router = require("express").Router();
const {
  loginAndGetToken,
  validateRegistration,
  forgotPassword,
} = require("../../controllers/auth");

router.post("/signin", [], loginAndGetToken);

router.post("/registration", [], validateRegistration);

router.post("/forgotpassword", [], forgotPassword);

module.exports = router;
