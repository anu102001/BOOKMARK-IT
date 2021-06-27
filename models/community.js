const mongoose = require('mongoose')
const { Schema } = mongoose;

const communitySchema = new Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blogs'
    }
  ],
  tags: [
    {
      type: String
    }
  ],
});


module.exports= mongoose.model('Community', communitySchema)