var express = require("express");
var router = express.Router();

const sign_up_controller = require("../controllers/sign_up_controller");


router.get("/", sign_up_controller.index);

router.post("/", sign_up_controller.create_user);

module.exports = router;
