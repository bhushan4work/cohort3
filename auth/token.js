//here we use normal token logic which is stored in a "in memory variable"

const express = require("express");
const app = express();
app.use(express.json());  //global middleware to parse incoming data req

const users = [] //as we aint using any db rn, we use a "in memory variable" to store data"

function generateToken(){ //to generate token in form of a random string
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post("/signUp", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    //we can make this fxn more complex by adding some checks as: min usernameLength, etc
    
    users.push({
        username: username,
        password: password 
    })

    res.json({ 
        msg: "you are signed up"
    })

    console.log(users); //here users[] logs {username: , password: }
})

app.post("/signIn", (req,res) => {
    //we generate a token for user only when he is signedin & so we do it here
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = users.find( (u) => {
        if(u.username == username && u.password == password){
            return true;
        }
        else{
            return false;
        }
    })
    
    if(foundUser){
        const token = generateToken();
        foundUser.token = token;
        res.json({
            msg: `your token is ${token}`
        })
    }
    else{
        res.status(404).send({
            msg: "invalid username or password"
        });
    }

    console.log(users);  //here users[] logs {username: , password: , token: }
})

//created a authenticated endpoint to return username & pass on providing correct token which was generated previously
app.get("/me" , (req,res) => { 
    const token = req.headers.token ; //in postman headers do : token : input

    let foundUser = users.find( (u) => {
        if(u.token == token ){
            return true;
        }
        else{
            return false;
        }
    })

    if(foundUser){
        res.json({
            username: foundUser.username, 
            password: foundUser.password
        })
    }
    else{
        res.status(404).send({
            msg: "invalid token"
        });
    }
    
})

app.listen(3000, () => {
    console.log("server is running on port 3000...");
})

