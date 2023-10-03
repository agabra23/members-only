const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  timestamp: { type: Date, required: true, maxLength: 100 },
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

UserSchema.virtual("full_name").get(function () {
  let full_name = "";
  if (this.first_name && this.last_name) {
    full_name = `${this.last_name}, ${this.first_name}`;
  }

  return full_name;
});

module.exports = mongoose.Model("User", UserSchema);
