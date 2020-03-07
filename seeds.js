const mongoose = require('mongoose');
const Campground = require("./models/campground")
const Comment = require("./models/comments")
let data = [
    {
        name: "Cloud's Rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjvZAUXK_-bSqeMVinCoAfNAF-svIeElxznu77_7LIoEXg6Bll",
        description: "A nice place"
    },
    {
        name: "Lover's peak",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJ6ACzlR8eeMRVfcueWdnO9C1mmQXmD78MADizFVjCbu3gk6W1",
        description: "A nicer place"
    },
    {
        name: "Desert Rose",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS83PuGvYB7Xqq5dgam067zgrd5bSdrm-jq-kWvdI-z9hEgWxcF",
        description: "A nicest place"
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed campgrounds!");
          //add a few campgrounds
         data.forEach(function(seed){
             Campground.create(seed, function(err, campground){
                 if(err){
                     console.log(err)
                 } else {
                     console.log("added a campground");
                     //create a comment
                     Comment.create(
                         {
                             text: "This place is great, but I wish there was internet",
                             author: "Homer"
                         }, function(err, comment){
                             if(err){
                                 console.log(err);
                             } else {
                                 campground.comments.push(comment);
                                 campground.save();
                                 console.log("Created new comment");
                             }
                         });
                 }
             });
         });
     }); 
     //add a few comments
 }

module.exports = seedDB

