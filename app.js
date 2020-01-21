const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser : true})
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs");

//setting up SCHEMA

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

let Campground = mongoose.model("campground", campgroundSchema);

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
            res.render("index", {campgrounds:allCampgrounds})
        }
    })
   // res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs")
})

app.post("/campgrounds", function (req,res){
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {
        name : name,
        image : image
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
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err){
            console.log(err);
                } else {
                      //render show template with the campground
                    res.render("show", {campgrounßd: foundCampground})
                }
    });
  
})

app.listen(5500, process.env.IP, function(){
    console.log("the YelpCamp Server")
});