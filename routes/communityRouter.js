const express = require("express");
const Community = require("../models/community");
const Blogs = require('../models/blogs.js');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

// index
// show
// new
// newPost
// edit
// editPost
// delete
// deletePost
router.get('/', ensureAuthenticated,async (req, res) => {
    Community.find({}, (err, communities) => {
        if (err) {
            console.log(err);
        } else {
            
            res.render('community/index', {
                communities,
            })
        }
    });
});

router.get('/new', ensureAuthenticated ,async (req, res) => {
    res.render('community/new');
})

router.post('/new', (req, res) => {
    var name = req.body.name;
    var newCommunity = new Community({
        name: name,
    });
    console.log(newCommunity);
    newCommunity.save(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/community');
        }
    });
});

router.get('/:id', async (req, res) => {
    
    Community.findById(req.params.id, async (err, foundCommunity) => {
      
        if (err) {
            console.log(err);
        } else {
            
            
            
            
            // console.log('Array of blog ids: ')
            // console.log(foundCommunity.blogs);
            // foundCommunity.blogs.forEach(blog_id => {
            //     console.log('BLog_ID from /:id  : ')
            //      console.log(blog_id);
            //      Blogs.findById(blog_id, (err, found) => {
            //          if(err) {
            //              console.log(err);
            //          } else {
            //             // console.log(found);
            //             blogs.push(found);
            //          }
            //      }); 
            // });

            const blogs = await Blogs.find({ '_id' : { $in: foundCommunity.blogs } });

           
            res.render('community/show', {
                community: foundCommunity,
                blogs: blogs
            });
        }
    });

});

router.get('/:id/addBlog',ensureAuthenticated, (req, res) => {
    res.render('community/addBlog', {
        communityId: req.params.id
    });
});

router.post('/:id/addBlog',ensureAuthenticated, async (req, res) => {
    var url = req.body.url;
    try{
        Blogs.findOne({
            link: url
        }, (err, blog) => {       
            if(err){
                console.log(err);
            } else {
                if(blog===null){
                    res.send("please add blog to your account")
                }
                else{ 
                console.log('Blog:')
                console.log(blog);
                Community.findById(req.params.id, (err, community) => {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log('Community: ')
                        console.log(community);
                         community.blogs.push(blog._id);
                        community.save();
                        console.log(community);
                        console.log('Community updated')
                        res.redirect(`/community/${req.params.id}`)
                    }
                });
             }
            }
        })
    } catch (e) {
        console.log(e);
    }
    
});
router.get('/:id/edit',ensureAuthenticated, (req, res) => {
    Community.findById(req.params.id, (err, foundCommunity) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send('/edit', { Community: foundCommunity });
        }
    })

})

router.post('/:id/edit', ensureAuthenticated,(req, res) => {
    Community.findByIdAndUpdate(req.params.id, (err, foundCommunity) => {
        if (err) {
            console.log(err);
        }
        else {
            const { id } = req.params;
            res.render(`community/${community._id}`);
        }
    })
})

router.post('/:community/delete',ensureAuthenticated,(req, res) => {
    Community.remove({ _id: req.params.community }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
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