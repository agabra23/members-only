const Message = require("../models/Message.js");
const User = require("../models/User.js");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  //   const messages = [
  //     { text: "Message 1", user: { full_name: "John Doe" } },
  //     { text: "Message 2", user: { full_name: "Jane Doe" } },
  //     { text: "Message 3", user: { full_name: "Jack Doe" } },
  //   ];
  const messages = await Message.find()
    .sort({ timestamp: 1 })
    .populate("user")
    .exec();

  console.log(req.user);
  res.render("index", { messages: messages, user: req.user });
});

exports.get_create_message = asyncHandler(async (req, res, next) => {
  res.render("new-message");
});

exports.create_message = asyncHandler(async (req, res, next) => {
  try {
    console.log("User", req.user);
    const message = new Message({
      timestamp: new Date(),
      text: req.body.message,
      user: req.user,
    });

    const result = await message.save();
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});
