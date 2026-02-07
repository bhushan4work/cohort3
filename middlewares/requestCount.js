const express = require("express");
const port = 3000
const app = express();

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable


let requestCount = 0 ;

// Global middleware to log requests
app.use((req, res, next) => {
  requestCount += 1; // Increment the request count for every incoming request
  next(); // Pass control to the next middleware or route handler
});


app.get("/user" , (req,res) => {
    res.json({msg : " aagya bhai"})
})

app.get("/user2" , (req,res) => {
    res.json({msg : "ek aur baar aagya bhai"})
})

app.get("/requestCount" , (req,res) => {
    res.status(200).json({requestCount})
})


app.listen(port,() =>{
    console.log(`server is running on ${port} port`)
} ); 