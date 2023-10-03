const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isMember: { type: Boolean, required: true },
});

UserSchema.virtual("full_name").get(function () {
  let full_name = "";
  if (this.first_name && this.last_name) {
    full_name = `${this.first_name} ${this.last_name}`;
  }

  return full_name;
});

module.exports = mongoose.model("User", UserSchema);
