const express= require('express')
//need mergeParams so it can find ID
const router = express.Router({mergeParams:true});
const Campground = require('../models/campground');
const Comment = require('../models/comments');

// COMMENTS ROUTES


//New Comments
router.get("/new", isLoggedIn, function(req,res){
    //find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err)
        } else{
            res.render("comments/new", {campground: campground})
        }
    });
  
})

//Comments create
router.post("/", isLoggedIn, function (req,res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
          //create new comment
        if(err){
            console.log(err);
            redirect("/campgrounds");
        } else {
        Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err)
            } else {
                //add username and ID to comment 
                //can only get user bc you can only access this page with a user
                comment.author.id = req.user._id;
                comment.author.username = req.user.username
                //save comment
                comment.save();
                //connect comment to campground
                campground.comments.push(comment)
                campground.save();
                //redirect campground show pag
                res.redirect("/campgrounds/" + campground._id)
            }
        })
    }  
})
});

//Middleware
function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login")
}


module.exports = router;