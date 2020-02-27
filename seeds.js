const mongoose = require('mongoose');
const Campground = require("./models/campground")
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
    Campground.remove({}, function(err){
        if (err){
            console.log(err)
        }
            console.log("removed campgrounds!")
            data.forEach(function(seed){
                Campground.create(seed, function(err, data){
                    if(err){
                        console.log(err)
                    }else {
                        console.log("added campground")

                        //create comment
                        Comment.create({
                            text: "how great",
                            author: "Tati"
                        },function(err, comment){
                            if (err){
                                console.log(err)
                            } else {
                                Campground.comments.push(comment);
                                Campground.save()
                                console.log("created new comment")
                            }
                        }
                        )
                    }
                });
            });
    });
    //add a few campgrounds

    //add a few comments
}

module.exports = seedDB

