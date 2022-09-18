const router = require("express").Router();
const { getResults, seed } = require("../../controllers/search");

router.get("/", [], getResults);
router.post("/", [], seed);

module.exports = router;
