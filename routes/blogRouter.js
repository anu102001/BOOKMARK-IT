const express = require('express');
const Blogs = require('../models/blogs.js');
const axios = require("axios");
const cheerio = require("cheerio");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


const {getContent} = require('../scraper.js');

var router = express.Router();

router.use(express.urlencoded({extended:true}));

router.get('/',async (req,res)=>{
    // const blogs= await Blogs.find()
    // res.render('../views/blogs/index')

    Blogs.find({}, (err, blogs) => {
        if(err){
            console.log(err);
        } else {
            // console.log(blogs);
            res.render('blogs/index', {
                Blogs: blogs
            });
        }
    })
});
router.get('/myblogs', ensureAuthenticated, async (req, res) => {
    try {
      const blogs = await Blogs.find({ user: req.user.id });
      console.log(Blogs);

      res.render('user/index', {
        name: req.user.firstName,
        blogs,
      })
    } catch (err) {
      console.error(err)
      res.send('error')
    }
  });

router.get('/new',ensureAuthenticated,(req,res)=>{
     res.render('../views/blogs/new')
});

router.post('/', async (req, res) => {

    try{
        var url = req.body.url;
        var USER = req.user.id;
        Blogs.findOne({
            link: url
        }, (err, blog) => {       
            if(err){
                console.log(err);
            } else {
                if(blog===null){
                axios.get(url) 
            .then(async (response) => {
                var html = response.data;
                var $ = await cheerio.load(html);

                var heading = $('h1').text();
               var img = $('img');
                var p = $('#speakable-summary').text();
              

               /* var maxIdx = -1;
                var maxSize = 0;
                for (var i = 0; i < img.length; i++) {
                    if (img[i].attribs.width * img[i].attribs.height >= maxSize) {
                      maxSize = img[i].attribs.width * img[i].attribs.height;
                      maxIdx = i;
                    }
                }
         */
                var newBlog = new Blogs({
                    link : url,
                    heading : heading,
                   // img: img[maxIdx].attribs.src,
                    img: img[0].attribs.src,
                    content: p,
                    user: USER
                });

                await newBlog.save(err => {
                    if(err){
                        console.log(err);
                    } else {
                        
                        res.redirect(`/blogs`);
                    }
                })
            });

    } else{
        res.send('blog already added');
    }


 }) }catch (e) {
        console.log(e);
    }
});

router.get('/:id', (req, res) => {
    Blogs.findById(req.params.id, (err, blog) => {
        if(err) {
            console.log(err);
        } else {
            res.render('blogs/show', {
                blog: blog
            })
        }
    })
});

router.post('/:id/addcomment',ensureAuthenticated,function(req,res){
    Blogs.findById(req.params.id,  (error,findblog)=>{
        if(error)
        {
            console.log(error);
        }
        else
        {
       var name= req.user;
        
       
       var content= req.body.comment
       findblog.comment.push({name:name.name,content :content});
       findblog.save();
       res.redirect(`/`);
        }
    });

});


router.get('/:id/edit',async (req,res)=>{
    Blogs.findById(req.params.id, (err, blog) => {
        if(err) {
            console.log(err);
        } else {
            res.render('blogs/edit', {
                blog: blog
            })
        }
    });
});

router.post('/:id/edit',async (req,res)=>{
    var url = req.body.url;
    Blogs.findByIdAndUpdate(req.params.id, {link:url}, (err, blog) => {
        if(err) {
            console.log(err);
        } else {
            
            res.redirect(`/blogs`)
        }
    })
});

router.post('/:id/delete',ensureAuthenticated, async(req,res)=>{
 try{
      let dblog=  await Blogs.findById(req.params.id).lean();
  if(!dblog){
      return res.render('error/404')
  }
  if(dblog.user!=req.user.id){
      res.send('you can not delete this blog')
  } else{
      await Blogs.remove({_id: req.params.id})
      res.redirect('/blogs/myblogs')
      console.log("blogs deleted")
   }
}
 catch(err){
    console.log(err);
    res.send('error')
 }
});

module.exports = router;
