const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  timestamp: { type: Date, required: true, maxLength: 100 },
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Message", MessageSchema);
