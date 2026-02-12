const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
const ObjectId = mongoose.Types.ObjectId ;

const purchaseSchema = new Schema({
    userId: ObjectId, // Reference to the user's ObjectId who made the purchase , (identify who purchased this course)
    courseId: ObjectId, // Reference to the purchased course's ObjectId , (identify which course is purchased)
})

const purchaseModel = moongoose.model("Purchase" , purchaseSchema);

module.exports = {
    purchaseModel
}