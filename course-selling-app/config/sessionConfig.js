// Load environment variables from .env file into process.env
require('dotenv').config();

// Import connect-mongo to store sessions in MongoDB instead of memory
const MongoStore = require('connect-mongo').default;

// Get MongoDB connection URL from .env
const MONGODB_URL = process.env.MONGODB_URI;

// Get two different secrets from .env for signing cookies
// One for admin sessions, one for user sessions
const SESSION_ADMIN_SECRET = process.env.SESSION_ADMIN_SECRET;
const SESSION_USER_SECRET = process.env.SESSION_USER_SECRET;

// Configuration object for ADMIN sessions
adminSessionConfig = {
    secret: SESSION_ADMIN_SECRET,     // Used to sign/encrypt admin session cookie
    resave: false,                    // Don't save session again if nothing changed
    saveUninitialized: false,         // Don't create session until something is stored in it
    store: MongoStore.create({        // Store sessions in MongoDB (persistent storage)
        mongoUrl: MONGODB_URL
    })
};

// Configuration object for USER sessions
userSessionConfig = {
    secret: SESSION_USER_SECRET,      // Used to sign/encrypt user session cookie
    resave: false,                    // Same behavior as above
    saveUninitialized: false,         // Same behavior as above
    store: MongoStore.create({        // Same MongoDB store, but different cookie secret
        mongoUrl: MONGODB_URL
    })
};

// Export both configs so you can use them in different Express apps/routers
module.exports = {
    adminSessionConfig,
    userSessionConfig,
};
