const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Campground = require('./models/campground.js');
const Comment = require('./models/comments.js')
const User = require('./models/users.js')
const seedDB = require("./seeds.js")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser : true})
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs");

seedDB();


Campground.create(
    function(err, campground){
        if (err){
            console.log("error")
        } else {
            console.log("newly created campground")
            console.log(campground)
        }
    }
);


app.set("view engine", "ejs")


app.get("/", function(req,res){
    res.render("landing")
});

app.get("/campgrounds", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds})
        }
    })
   // res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new")
})

app.post("/campgrounds", function (req,res){
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {
        name : name,
        image : image,
        description: desc
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
app.get("/campgrounds/:id", function(req,res){
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

// COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new", function(req,res){
    //find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err)
        } else{
            res.render("comments/new", {campground: campground})
        }
    });
  
})

app.listen(5500, process.env.IP, function(){
    console.log("the YelpCamp Server")
});