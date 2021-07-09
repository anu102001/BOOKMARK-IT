const mongoose = require('mongoose')
const { Schema } = mongoose;

const blogschema = new Schema({
    title:{
        type:String,
        required: true
    },
    link:{
        type:String,
        required: true
    },

    img:{
        type:String,
    },
    heading:{
        type:String,
    },
    content:{
        type:String,
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    comment:[
        {
              name:{
                  type:String
              },
              content:{
                type:String
              }
        }
    ]
});

module.exports = mongoose.model('Blogs', blogschema);