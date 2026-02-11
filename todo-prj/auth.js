const jwt = require("jsonwebtoken");
const JWT_SECRET = "iloveme";


function auth(req,res,next){
    const token = req.headers.token ; //get token from req headers
    const decodedData = token.verify(token, JWT_SECRET); //verify the token
    
    if(decodedData){
        req.userId = decodedData.id; //get user id from token 
        next();
    }
    else{
        res.status(403).json({
            msg: "incorrect credentials"
        })
    }
}

module.exports = {
    auth ,
    JWT_SECRET
}