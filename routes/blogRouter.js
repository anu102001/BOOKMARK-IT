const express = require('express');
const Blogs = require('../models/blogs.js');

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

router.post('/', async (req, res) => {
    try{
        var url = req.body.url;

        var content = await getContent(url);
    
        console.log(content);
    
        var newBlog = new Blogs({
            link: url,
            heading: content?.heading,
            img: content?.img,
            content: content?.content
        });
    
    
        newBlog.save(err => {
            if(err){
                console.log(err);
            } else {
                res.redirect(`/blogs`);
            }
        })
    } catch (e) {
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
    console.log("Blog Deleted");
    res.redirect('/blogs')
});



module.exports = router;


// https://developers.medium.com/
