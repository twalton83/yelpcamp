const express = require("express");
const app = express();


app.set("view engine", "ejs")


app.get("/", function(req,res){
    res.render("landing")
})

app.get("/campgrounds", function(req,res){
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
    res.render("campgrounds", {campgrounds:campgrounds});
})
app.listen(5500, process.env.IP, function(){
    console.log("the YelpCamp Server")
})