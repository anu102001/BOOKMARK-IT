import mongoose from "mongoose";
const { Schema } = mongoose;

const communityschema = new mongoose.schema({
  name: String,
  user: String,
  blogs: String,
  tags: String,
});

module.exports = mongoos4
module.exports= mongoose.model('Community', blogschema)Com