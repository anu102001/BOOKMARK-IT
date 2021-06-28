const express = require("express");
const Community = require("../models/community");
const Blogs = require('../models/blogs.js');

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
router.get('/', async (req, res) => {
    Community.find({}, (err, communities) => {
        if (err) {
            console.log(err);
        } else {
            console.log(communities);
            res.render('community/index', {
                communities,
            })
        }
    });
});

router.get('/new', async (req, res) => {
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

router.get('/:id', (req, res) => {
    Community.findById(req.params.id, (err, foundCommunity) => {
        if (err) {
            console.log(err);
        } else {
            var blogs = [];
            foundCommunity.blogs.forEach(blog_id => {
                 console.log(blog_id)
            });
            console.log(blogs);
            res.render('community/show', {
                community: foundCommunity,
                blogs
            });
        }
    });

});

router.get('/:id/addBlog', (req, res) => {
    res.render('community/addBlog', {
        communityId: req.params.id
    });
});

router.post('/:id/addBlog', async (req, res) => {
    var url = req.body.url;
    try{
        Blogs.findOne({
            link: url
        }, (err, blog) => {       
            if(err){
                console.log(err);
            } else {
                console.log(blog);
                Community.findById(req.params.id, (err, community) => {
                    console.log(community);
                    community.blogs.push(blog);
                    community.save();
                    console.log(community);
                    res.redirect(`/community/${req.params.id}`)
                });
            }
        })
    } catch (e) {
        console.log(e);
    }
    
});
router.get('/:id/edit', (req, res) => {
    Community.findById(req.params.id, (err, foundCommunity) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send('/edit', { Community: foundCommunity });
        }
    })

})

router.post('/:id/edit', (req, res) => {
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

router.post('/:community/delete', (req, res) => {
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