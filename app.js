const request = require("request");
const express =require("express");
const expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser')
 
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const port = 5000;
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));
 
// Passport Config
require('./config/passport')(passport);
const blogRoutes = require('./routes/blogRouter.js');
const communityRoutes = require('./routes/communityRouter.js');
const users = require('./routes/users.js');
const index = require('./routes/index.js');

const {deleteAllBlogs, deleteAllCommunities} = require('./helper')
// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

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
// deleteAllCommunities();

app.set('view engine','ejs');

app.use(express.static('public'))
app.use('/css',express.static(__dirname +'public/css'))
app.use('/css',express.static(__dirname +'public/js'))
app.use('/css',express.static(__dirname +'public/img'))


/*app.get('/',(req, res)=>{
    res.render('../views/home');
});*/
//users
app.use('/',index);
app.use('/users', users);
//created

app.use('/blogs', blogRoutes);
app.use('/community', communityRoutes);
app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
});