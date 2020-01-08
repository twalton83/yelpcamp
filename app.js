const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds =  [
    {
        name: "Salmon Creek",
        image: "https://koa.com/blog/images/solo-camping-tips.jpg"
    },
    {
        name: "Granite Hill",
        image: "https://koa.com/blog/images/solo-camping-tips.jpg"
    },
    {
        name: "Mountain Goats Rest",
        image: "https://koa.com/blog/images/solo-camping-tips.jpg"
    } 
]


app.set("view engine", "ejs")


app.get("/", function(req,res){
    res.render("landing")
})

app.get("/campgrounds", function(req,res){
    
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs")
})

app.post("/campgrounds", function (req,res){
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page

    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {
        name : name,
        image : image
    };
    campgrounds.push(newCampground);

    res.redirect("/campgrounds")
});


app.listen(5500, process.env.IP, function(){
    console.log("the YelpCamp Server")
})