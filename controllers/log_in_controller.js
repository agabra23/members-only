const Message = require("../models/Message.js");
const User = require("../models/User.js");
const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("log-in");
});

exports.authenticate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Authentication failed
      return res.redirect("/log-in"); // Redirect to login page
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Authentication succeeded, redirect to the desired page
      return res.redirect("/");
    });
  })(req, res, next);
};
