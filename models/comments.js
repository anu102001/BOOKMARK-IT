const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsschema = new mongoose.Schema({
  name:{
    type:String
  },
  
  content: {
    type:String
  }
});
module.exports = mongoose.model("Comments", commentsschema);
