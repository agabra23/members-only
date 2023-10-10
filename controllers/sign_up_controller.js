const Message = require("../models/Message.js");
const User = require("../models/User.js");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("sign-up");
});

exports.create_user = asyncHandler(async (req, res, next) => {
  try {
    const user = new User({
      first_name: "test",
      last_name: "test",
      email: req.body.email,
      password: req.body.password,
      isMember: false,
    });
    const result = await user.save();
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});
