//job is to : Check req.session.adminId


// Middleware to check if the admin is authenticated
function adminMiddleware(req, res, next) {
    // Check if a session exists AND it contains adminId
    if (req.session && req.session.adminId) {
        // Attach adminId from session to the request object
        // So next handlers can access it as: req.adminId
        req.adminId = req.session.adminId; 
        
        // Admin is authenticated, continue to the next middleware/route
        return next(); 
    }
    
    // If no valid admin session, block the request
    return res.status(401).json({ 
        message: "Unauthorized" 
    });
}

module.exports = {
    adminMiddleware,
};
