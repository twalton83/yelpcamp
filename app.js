const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Campground = require('./models/campground.js');
const Comment = require('./models/comments.js')
const User = require('./models/users.js')
const seedDB = require("./seeds.js")
const passport = require("passport")
const localStrategy = require("passport-local")


mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser : true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))
app.set('view engine', "ejs");
// uses the seedDB function defined within the seed file
seedDB();

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

// ========== ROUTES ========== //

app.get("/", function(req,res){
    res.render("landing")
});

app.get("/campgrounds", function(req,res){
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

app.get("/campgrounds/new", isLoggedIn, function(req,res){
    res.render("campgrounds/new")
})

app.post("/campgrounds", isLoggedIn, function (req,res){
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
    //find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err)
        } else{
            res.render("comments/new", {campground: campground})
        }
    });
  
})
app.post("/campgrounds/:id/comments", isLoggedIn, function (req,res){
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

// ======= AUTH ROUTES ======== / 

//register route
app.get('/register', function(req, res){
    res.render('register')
});

//posts from register form
app.post("/register", function(req, res){
    //this takes the form POST input for username, creates a new user, registers user with password 
    let newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err)
            return res.render('register')
        }
        //this is what logs them in 
        passport.authenticate("local")(req, res, function(){
            res.redirect('/campgrounds')
        })
    })   
});
//login route
app.get('/login', function(req,res){
    res.render('login')
})
//posts from login form, actually "does" the login
app.post("/login", /* middleware */ passport.authenticate("local", {
    //it will redirect based on success of the login
    successRedirect: "/campgrounds",
    failureRedirect:"/login"
}), function(req, res){
});

//logout route
app.get("/logout", function(req,res){
    //passport destroys all user data in this session
    req.logout();
    res.redirect("/")
    console.log("user logged out")
})


function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login")
}


// ===== app.listen ===== // 
app.listen(5500, process.env.IP, function(){
    console.log("the YelpCamp Server")
})