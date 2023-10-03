var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const messages = ["Message 1", "Message 2", "Message 3"];
  res.render("index", { messages });
});

module.exports = router;
