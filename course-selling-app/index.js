const express = require("express");
const mongoose = require("mongoose");

const { userModel, courseModel } = require("./db");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { auth, JWT_SECRET } = require("./auth");

const app = express();

app.use(express.json());
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);



//made this async fxn here so that it awaits until mongodb connects & only then the server runs
//so here if db is not connected properly server never starts instead of starting the server with improper db connection
async function main() {
    await mongoose.connect("mongodb+srv://admin:ir4hePfR0VhnTJhr@cluster0.tyo065j.mongodb.net/course-app");

    app.listen(3000, () => {
        console.log("server is running on 3000 port");
    })
}
main();