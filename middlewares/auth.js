//  Implement an authentication middleware that checks for a valid API key in the request headers.

const express = require('express');
const port = 3000;
const app = express();
const VALID_API_KEY = '100xdevs_cohort3_super_secret_valid_api_key'; // key is 100xdevs-api-key use that API key for authenticate user


app.use(authenticateAPIKey);  // Apply the auth middleware globally

// global Middleware to check for a valid API key
function authenticateAPIKey(req, res, next) {
    //  authenticate APIKey here
    const apiKey = req.headers["api-key"]; //in postman write (api-key = input)

    if(apiKey == VALID_API_KEY){
        next();
    }
    else{
        return res.status(404).send("invalid api key");
    }
}

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Access granted' });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


