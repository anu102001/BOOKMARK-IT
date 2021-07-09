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
    content:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Blogs', blogschema);