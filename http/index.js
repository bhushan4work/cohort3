const express = require("express");
const port = 3000;
const app = express();


app.get("/sum", function(req, res) {
    const a = Number(req.query.a); //parseInt can also be done instead of Number
    const b = Number(req.query.b);
    
    res.json({
        ans: a + b
    })
});

//other way to give inputs : 
//in postman give url as"http://localhost:3000/sum/2/3"
// app.get("/sum/:a/:b", function(req, res) {
//     const a = Number(req.params.a); //parseInt can also be done instead of Number
//     const b = Number(req.params.b);
//     res.json({
//         ans: a + b
//     })
// });

app.get("/multiply", function(req, res) {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    
    res.json({
        ans: a * b
    })
});

app.get("/divide", function(req, res) {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = Number(req.query.a); 
    const b = Number(req.query.b);
    
    res.json({
        ans: a - b
    })
});


app.listen(port, () => {
    console.log(`server is runnning on port ${port}`);
})