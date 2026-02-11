
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email: { type: String, unique: true }, // Make email unique to avoid duplicate entries
    password: String ,
    name: String
})

const todoSchema = new Schema({
    title: String,
    done: { type: Boolean, default: false }, // Default 'done' to false
    userId : ObjectId ,
     createdAt: { type: Date, default: Date.now }, // Timestamp for when the todo was created
    deadline: { type: Date } // Optional timestamp for when the todo should be done
})

const userModel = new mongoose.model("users" , userSchema) ;
const todoModel = new mongoose.model("todos", todoSchema);

module.exports  = {
    userModel: userModel,
    todoModel: todoModel
}
