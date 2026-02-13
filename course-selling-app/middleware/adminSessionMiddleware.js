//job of this file is to: Read cookie from browser, Load session from MongoDB ,Attach it to req.session 


// Import express-session middleware
const session = require('express-session');

// Import the admin session configuration object
const { adminSessionConfig } = require('../config/sessionConfig');

// Create a session middleware specifically for ADMINS
// session(adminSessionConfig) returns a middleware function
const adminSessionMiddleware = session(adminSessionConfig);

// Export it so it can be used in your app or admin routes
module.exports = {
    adminSessionMiddleware,
};

// Export the middleware as function directly
module.exports = adminSessionMiddleware;