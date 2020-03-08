//The "models" are creating the schemas for MongoDB. 
//This is creating a user schema, then exporting it to app.js

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")


const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
//takes the wheel, adds in methods to the user
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema);