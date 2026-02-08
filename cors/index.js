// task for cors : 
// 1. Create a backend server in node.js that returns 'sum' endpoint 2. Write HTML file, that hits backend server using "fetch` api

const express = require('express');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(express.json()) //this global middleware that parses data incoming request bodies with JSON payloads

//allows req from any frontend domains if we simply use : app.use(cors())
app.use(cors({ 
    domains : ["http://google.com" , "http://facebook.com"] //now we allow only these domains to hit the backend server
}))

//incase frontend & backend both are hosted on same domain ex : localhost://3000, then we dont need cors (usually both are hsoted separately)

app.get('/sum', (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);s

    res.json({
        ans : a+b
    })
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


//conclusion : 
//when we dont use cors middleware & hit a server with fetch req by giving a npx serve command to serve the data to the backend server
//our req gets blocked by the cors policy of browser but the same req works on postman software
//that is why we include cors middleware at the top to handle this