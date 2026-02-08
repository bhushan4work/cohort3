const express = require('express');
const port = 3000;
const app = express();

app.use(logRequests); //This global middleware logs\prints every request that comes to your server

// Middleware to log\print requests
function logRequests(req, res, next) {
    const log = `${req.method} ${req.url} - ${new Date().toISOString()}`;
    console.log(log);
    next(); // Pass to the next middleware or route handler
}

app.get('/', (req, res) => {
    res.status(200).json({ message: 'hello world' });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;