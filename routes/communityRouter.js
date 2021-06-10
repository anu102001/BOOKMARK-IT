const express = require("express");
const community=reuire("./models/community");
const router = express.Router();

// index
// show
// new
// newPost
// edit
// editPost
// delete
// deletePost
router.get('/',async (req,res)=>{
    const community = await community.find();
    res.send('community',{community})
});

router.get('/new',async (req,res)=>{

    res.send('/new',{community:newcommunity})
})

router.post('/new',(req,req)=>{
    res.redirect('community');
})


module.exports = router;