const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  tagname: String,
});

module.exports = mongoose.model("Tags", tagSchema);
