const express = require('express');
const Blogs= require('../models/blogs.js')
var router = express.Router();

router.get('/',async (req,res)=>{
    const blogs= await Blogs.find()
    res.send('on main blog page')
});

router.get('/new', (req,res)=>{
     res.send('on page new')
});

router.get('/:id/edit',async (req,res)=>{
    const blog = await Blogs.findById(req.params.id)
    res.send('on page edit')
});
router.post('/', async(req,res)=>{


});
router.put('/:id',async (req,res)=>{
    req.blog = await Blogs.findById(req.params.id)

});
router.delete('/:id', async(req,res)=>{
    await Blogs.findByIdAndDelete(req.params.id)
    res.redirect('/')
});


module.exports = router;