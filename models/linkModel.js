const mongoose = require("mongoose");

const linkSchema = {
  courseTitle: String,
  url: String,
  courseNumber: { type: Number, unique: true },
};

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
