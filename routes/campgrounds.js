const express= require('express')
const router = express.Router()
const Campground = require('../models/campground')



router.get("/", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            // this passes the variable campgrounds to the template, using the referenced about "allCampgrounds"
            //it also passes in a variable called "currentUser" with the req.user generated from Passport
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser:req.user})
        }
    })
   // res.render("campgrounds", {campgrounds:campgrounds});
});

router.get("/new", isLoggedIn, function(req,res){
    res.render("campgrounds/new")
})

router.post("/", isLoggedIn, function (req,res){
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = {
        name : name,
        image : image,
        description: desc,
        author: author
    };
   //create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("error")
        } else {
               //redirects back to campgrounds 
            res.redirect("/campgrounds")
        }
    });

});

    

//shows more info about one campground 


router.get("/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if(err){
            console.log(err);
                } else {
                      //render show template with the campground
                    res.render("campgrounds/show", {campground: foundCampground})
                }
    });
  
})

// ========== Edit =========
router.get("/:id/edit", function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campground");
        }else {
            res.render("campgrounds/edit", {campground: foundCampground}) // this part passes the info in to the template
        }
    })

})
//Update 

router.put("/:id", function(req,res){

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login")
}


module.exports = router;
