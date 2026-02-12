const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const userSchema = new Schema({
    email : {type: String, unique: true} ,
    firstName : String ,
    lastName : String ,
    password: String 
})

const userModel = mongoose.model("User" , userSchema);

module.exports = {
    userModel
}