const router = require("express").Router();
const {
  getProfile,
} = require("../../controllers/user");

// middlewares ...
const { authUser } = require("../../middleware/authUser");

router.get("/:userId", [authUser], getProfile);
module.exports = router;
