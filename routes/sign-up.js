var express = require("express");
var router = express.Router();

const sign_up_controller = require("../controllers/sign_up_controller");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   const messages = [
//     { text: "Message 1", user: { full_name: "John Doe" } },
//     { text: "Message 2", user: { full_name: "Jane Doe" } },
//     { text: "Message 3", user: { full_name: "Jack Doe" } },
//   ];
//   res.render("index", { messages });
// });

// GET HOME PAGE
router.get("/", sign_up_controller.index);

router.post("/", sign_up_controller.create_user);

module.exports = router;
