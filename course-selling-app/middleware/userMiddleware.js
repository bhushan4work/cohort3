//job is to : Check req.session.userId


function userMiddleware(req, res, next) {
    // Log the current session object to the console (useful for debugging)
    console.log('Session:', req.session); 
    
    // Check if a session exists AND it contains a userId
    if (req.session && req.session.userId) {
        // Attach userId from session to the request object
        // So next handlers/controllers can access it as: req.userId
        req.userId = req.session.userId; 
        
        // User is authenticated, move to the next middleware/route handler
        return next();
    }
    
    // If no valid session or no userId in session, block the request
    return res.status(401).json({
        message: "Unauthorized",
    });
}

module.exports = {
    userMiddleware,
};
