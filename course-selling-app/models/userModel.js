const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const userSchema = new Schema({
    //_id : ObjectId is created automatically as a unique id on creation of each new user
    email : {type: String, unique: true} ,
    firstName : String ,
    lastName : String ,
    password: String 
})

const userModel = mongoose.model("User" , userSchema);

module.exports = {
    userModel
}