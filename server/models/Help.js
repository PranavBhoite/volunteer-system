const mongoose = require("mongoose");

const helpSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  place: { type: String, required: true },
  extraVolunteers: { type: Boolean, default: false },
  status: { type: String, enum: ["approved", "disapproved"], default: "disapproved" },
  userId: { type: String, required: true },
  name: String,
  email: String,
  phone: String,
}, { timestamps: true });

module.exports = mongoose.model("Help", helpSchema);