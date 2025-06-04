const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  mobileNo: String,
  status: { type: String, default: "active" } // active or inactive
});

module.exports = mongoose.model("User", userSchema);
