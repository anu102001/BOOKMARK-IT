const express = require("express");
const Community=require("../models/community");
const router = express.Router();

// index
// show
// new
// newPost
// edit
// editPost
// delete
// deletePost
router.get('/', async (req, res) => {
     res.render('../views/community/index')
});
router.get('/new',async (req,res)=>{

    res.render('/new',{community:newcommunity})
})

router.post('/new',(req,res)=>{
    res.redirect('/community');
})

router.get('/:id/edit', (req,res)=>{
    Community.findByID(req.params.id,(err,foundCommunity)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send('/edit',{Community:foundCommunity});
        }
    })
    

})

router.post('/community/:id',(req,res)=>{
    Community.findByIdAndUpdate(req.params.id,(err,foundCommunity)=>{
        if(err){
            console.log(err);
        }
        else{
            const {id}=req.params;
            res.render(`community/${community._id}`);
        }
    })
})

router.post('/:community/delete',(req,res)=>{
    Community.remove({_id:req.params.community},(err)=>{
      if(err){
          console.log(err);
      }
      else{
          res.redirect('/');
      }
    })
})

module.exports = router;

// Community.findById(req.params.id, (err, foundCommunity) => {
//     if(err) {
//          console.log(err);
//     } else {
//         res.rend('community/edit', {
//             Community: foundCommunity,
//         })
//     }
// })