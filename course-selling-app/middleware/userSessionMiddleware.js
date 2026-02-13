//job of this file is to: Read cookie from browser, Load session from MongoDB ,Attach it to req.session


// Import express-session middleware
const session = require('express-session');
// Import the user session configuration object you created earlier
const { userSessionConfig } = require('../config/sessionConfig');





// Create a session middleware specifically for USERS
// session(userSessionConfig) returns a middleware function
const userSessionMiddleware = session(userSessionConfig);

// Export the middleware as function directly
module.exports = userSessionMiddleware;
