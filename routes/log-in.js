var express = require("express");
var router = express.Router();

const log_in_controller = require("../controllers/log_in_controller");

router.get("/", log_in_controller.index);
router.post("/", log_in_controller.authenticate);

module.exports = router;
