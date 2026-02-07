// You have to create a middleware for rate limiting a users request based on their username passed in the header

const express = require('express');
const app = express();
 
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {}; 


//global clearance of req each sec is done by this clock fxn here 
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)


app.use(function(req,res,next){
    const userId = req.headers["user-id"] ;

    if(!userId){
        //if user id is not given give error 
        return res.status(404).send("badmooss user id daalde")
    }
    if(numberOfRequestsForUser[userId]){ 
        //when req is initialised , i.e 1 req is sent then increment cnt of req 
        numberOfRequestsForUser[userId] = numberOfRequestsForUser[userId] + 1;
        if(numberOfRequestsForUser[userId] >1){
            return res.status(404).send("no entry allowed")
        }
        else{
            next(); //else continue the flow of req 
        }
    }
    else{
        //else when req not initialised , initialise it with it
        numberOfRequestsForUser[userId] = 1;
        next() ; //can continue the flow as this will be the 1st req only 
    }

})


app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user2', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


module.exports = app;