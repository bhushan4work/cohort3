//here we replace normal token logic with JWT's , rest code is same as token.js

const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "iambhushan";
const app = express();
app.use(express.json());  //global middleware to parse incoming data req

const users = [] //as we aint using any db rn, we use a "in memory variable" to  store data"

app.post("/signUp", (req, res) => {
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

app.post("/signIn", (req, res) => {
    //we generate a token for user only when he is signedin & so we do it here
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = users.find((u) => {
        if (u.username == username && u.password == password) {
            return true;
        }
        else {
            return false;
        }
    })

    if (foundUser) {
        const token = jwt.sign({  //creates a jwt token
            username: username // converts username over to a jwt here
        }, JWT_SECRET);

        //as jwt itself stores its state we need not to store it in variable & hence we dont write below line
        //foundUser.token = token;

        res.json({
            msg: `your token is ${token}`
        })
    }
    else {
        res.status(404).send({
            msg: "invalid username or password"
        });
    }

    console.log(users);  //here users[] logs {username: , password: , token: }
})

//created a authenticated endpoint to return username & pass on providing correct token which was generated previously
app.get("/me", (req, res) => {
    const token = req.headers.token; //now u'll get a jwt here,in postman headers do : token : input
    const decodedInfo = jwt.verify(token, JWT_SECRET); //converts jwt back to username 

    if (decodedInfo.username) {
        //after username has been fetched from jwt , we hit the db to get the pass
        let foundUser = users.find((u) => {
            if (u.username == decodedInfo.username) {
                return true;
            }
            else {
                return false;
            }
        })

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

