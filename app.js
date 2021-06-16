const request = require("request");
const express =require("express");
const app = express();
const port = 5000;

const blogRoutes = require('./routes/blogRouter.js');
const communityRoutes = require('./routes/communityRouter.js');

const {deleteAllBlogs} = require('./helper')

// Seting Up Mongoose Connection
const mongoose = require('mongoose');
const mongoDB = "mongodb://localhost:27017/blogapp";
mongoose.connect(mongoDB, {
    useNewUrlParser: true,

    useCreateIndex: true,

    useUnifiedTopology: true,

    useFindAndModify: false
}).then(() => {
    console.log("Connected to Database");
}).catch(err => {
    console.log(err.message);
});

// deleteAllBlogs();

app.set('view engine','ejs');

app.use(express.static('public'))
app.use('/css',express.static(__dirname +'public/css'))
app.use('/css',express.static(__dirname +'public/js'))
app.use('/css',express.static(__dirname +'public/img'))


app.get('/',(req, res)=>{
    res.render('../views/home');
});

app.use('/blogs', blogRoutes);
app.use('/community', communityRoutes);
app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
});