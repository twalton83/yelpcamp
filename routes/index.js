// ======= AUTH ROUTES ======== / 
const express= require('express')
const router = express.Router();
const passport = require('passport')
const User = require('../models/users');

//Root route
router.get("/", function(req,res){
    res.render("landing")
});



//register route
router.get('/register', function(req, res){
    res.render('register')
});

//posts from register form
router.post("/register", function(req, res){
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
router.get('/login', function(req,res){
    res.render('login')
})
//posts from login form, actually "does" the login
router.post("/login", /* middleware */ passport.authenticate("local", {
    //it will redirect based on success of the login
    successRedirect: "/campgrounds",
    failureRedirect:"/login"
}), function(req, res){
});

//logout route
router.get("/logout", function(req,res){
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


module.exports = router