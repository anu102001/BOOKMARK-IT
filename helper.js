var Blogs = require('./models/blogs');
var Comment = require('./models/comments');
var Community = require('./models/community');
var Tags=require('./models/tags');
var User=require('./models/user');

module.exports.deleteAllCommunities = () => {
    Community.deleteMany({}, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('All communities deleted');
        }
    })
}



module.exports.deleteAllBlogs = () => {
    Blogs.deleteMany({}, (err) => {
        if(err){
            console.log(err);
        } else {
            console.log('Blogs Deleted');
        }
    });
}