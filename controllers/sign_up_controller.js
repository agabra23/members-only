const Message = require("../models/Message.js");
const User = require("../models/User.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("sign-up", { user: req.user });
});

exports.create_user = asyncHandler(async (req, res, next) => {
  // try {
  //   const user = new User({
  //     first_name: "test",
  //     last_name: "test",
  //     email: req.body.email,
  //     password: req.body.password,
  //     isMember: false,
  //   });
  //   const result = await user.save();
  //   res.redirect("/");
  // } catch (err) {
  //   return next(err);
  // }

  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB

    if (err) {
      return next(err);
    }

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      isMember: false,
    });
    const result = await user.save();
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      // Redirect the user to the desired page after signup.
      return res.redirect("/");
    });
  });
});
