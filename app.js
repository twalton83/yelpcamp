const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Campground = require('./models/campground.js');
const Comment = require('./models/comments.js');
const User = require('./models/users.js');
const seedDB = require("./seeds.js");
const passport = require("passport");
const localStrategy = require("passport-local");
const campgroundRoutes = require('./routes/campgrounds');
const commentRoutes = require('./routes/comments');
const indexRoutes = require('./routes/index');

const methodOverride = require('method-override')

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser : true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));


// uses the seedDB function defined within the seed file
//seedDB();

//PASSPORT CONFIGURATION //
app.use(require('express-session')({
    secret: "hello",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
    //anything in res.locals is passed to all templates
    res.locals.currentUser= req.user;
    next();
})


app.use(indexRoutes);

//adding the "/campgrounds" means that all routes inherently will start with /campgrounds
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds",campgroundRoutes);




//CAMPGROUNDS
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


// ===== app.listen ===== // 
app.listen(5500, process.env.IP, function(){
    console.log("the YelpCamp Server")
})