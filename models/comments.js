const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsschema = new mongoose.schema({
  approved: String,
  likes: Number,
  content: String,
});
module.exports = mongoose.model("Comments", commentsschema);
