const mongoose = require('mongoose')
const { Schema } = mongoose;

const communitySchema = new Schema({
  name: String,
  user: String,
  blogs: String,
  tags: String,
});


module.exports= mongoose.model('Community', communitySchema)