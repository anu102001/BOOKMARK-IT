const express = require('express');
const Blogs = require('../models/blogs.js')

var router = express.Router();

router.use(express.urlencoded({extended:true}));

router.get('/',async (req,res)=>{
    // const blogs= await Blogs.find()
    // res.render('../views/blogs/index')

    Blogs.find({}, (err, blogs) => {
        if(err){
            console.log(err);
        } else {
            console.log(blogs);
            res.render('blogs/index', {
                Blogs: blogs
            });
        }
    })
});

router.get('/new', (req,res)=>{
     res.render('../views/blogs/new')
});

router.post('/', (req, res) => {
    var url = req.body.url;

    var newBlog = new Blogs({
        link: url
    })

    newBlog.save(err => {
        if(err){
            console.log(err);
        } else {
            res.redirect(`/blogs`);
        }
    })
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
            console.log(blog);
            res.redirect(`/blogs`)
        }
    })
});

router.post('/:id/delete', async(req,res)=>{
    await Blogs.findByIdAndDelete(req.params.id)
    res.redirect('/blogs')
});



module.exports = router;


// https://developers.medium.com/
