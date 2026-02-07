//step1 : ensure that if there is an exception,, user should get status code of 404
//step2: if exception is detected in any endpoint, incr the counter of errors



const express = require("express");
const port = 3000
const app = express();

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable


let errorCount = 0 ;


app.get("/user" , (req,res) => {
    throw new Error;
    res.json({msg : " aagya bhai"})
})

app.get("/user2" , (req,res) => {
    res.json({msg : "ek aur baar aagya bhai"})
})

app.get("/errorCount" , (req,res) => {
    res.status(200).json({errorCount})
})

//error handling middleware
//will count error whenever /user req is passed
app.use(function(err,req,res,next){
    res.status(404).send({msg : "error agya bhai"})
    errorCount += 1; // Increment the error count for every incoming exception
    next(); // Pass control to the next middleware or route handler
})


app.listen(port,() =>{
    console.log(`server is running on ${port} port`)
} ); 