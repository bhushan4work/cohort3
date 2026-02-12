const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
const ObjectId = mongoose.Types.ObjectId ;

const courseSchema = new Schema({
    title : String ,
    price: Number ,
    description : String ,
    imageUrl : String,
    creatorId : ObjectId // Reference to the creator's ObjectId (Admin) who made this course
})

const courseModel = moongoose.model("Course" , courseSchema);

module.exports = {
    courseModel
}