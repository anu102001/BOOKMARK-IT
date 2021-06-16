const express = require('express');
const Blogs= require('../models/blogs.js')
var router = express.Router();
router.use(express.urlencoded({extended:true}));
router.get('/',async (req,res)=>{
    const blogs= await Blogs.find()
    res.render('../views/blogs/index')
});

router.get('/new', (req,res)=>{
     res.render('../views/blogs/new')
});
router.post('/', (req, res) => {
    console.log(req.body);
    res.send('new blog created');


});
router.get('/edit/:id',async (req,res)=>{
    const blog = await Blogs.findById(req.params.id)
    res.send('/edit')
});

router.put('/:id',async (req,res)=>{
    req.blog = await Blogs.findById(req.params.id)

});
router.delete('/:id', async(req,res)=>{
    await Blogs.findByIdAndDelete(req.params.id)
    res.redirect('/')
});



module.exports = router;


// https://developers.medium.com/
