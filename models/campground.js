const mongoose = require('mongoose')

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

let Campground = mongoose.model("campground", campgroundSchema);



module.exports = mongoose.model("Campground", campgroundSchema)