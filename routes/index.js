var express = require("express");
var router = express.Router();

const message_controller = require("../controllers/message_controller");

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
router.get("/", message_controller.index);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
