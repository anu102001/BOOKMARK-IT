const mongoose = require('mongoose')
const { Schema } = mongoose;

const blogschema = new Schema({
    link:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Blogs', blogschema);