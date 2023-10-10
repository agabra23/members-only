const Message = require("../models/Message.js");
const User = require("../models/User.js");
const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("log-in");
});

exports.authenticate = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});
