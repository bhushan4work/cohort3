require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const{PORT, MONGODB_URI} = require("./.env")

const { userRouter, courseRouter, adminRouter } = require("./routes");

const app = express();
app.use(express.json());

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);



//made this async fxn here so that it awaits until mongodb connects & only then the server runs
//so here if db is not connected properly server never starts instead of starting the server with improper db connection
async function main() {
    await mongoose.connect(process.env. MONGODB_URI);

    app.listen(process.env.PORT, () => {
        console.log("server is running on 3000 port");
    })
}
main();