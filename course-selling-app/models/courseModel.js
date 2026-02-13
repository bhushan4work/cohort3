const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
const ObjectId = mongoose.Types.ObjectId ;

const courseSchema = new Schema({
    //_id : ObjectId is created automatically as a unique id on creation of each new course
    title : String ,
    price: Number ,
    description : String ,
    imageUrl : String,
    creatorId : ObjectId // Reference to the creator's ObjectId (Admin) who made this course
})

const courseModel = mongoose.model("Course" , courseSchema);

module.exports = {
    courseModel
}