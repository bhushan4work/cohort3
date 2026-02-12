const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const adminSchema = new Schema({
    email : {type: String, unique: true} ,
    firstName : String ,
    lastName : String ,
    password: String 
})

const adminModel = mongoose.model("Admin" , adminSchema);

module.exports = {
    adminModel 
}