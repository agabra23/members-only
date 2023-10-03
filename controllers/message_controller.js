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

  res.render("index", { messages });
});
