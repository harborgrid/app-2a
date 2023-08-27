const EngineError = require('../utilities/EngineError');

// Middleware to log request details
const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
};

// Middleware for authentication (placeholder, can be expanded upon)
const authenticate = (req, res, next) => {
    // Placeholder logic: In a real-world scenario, you'd check tokens, sessions, etc.
    if (req.headers['authorization']) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    if (err instanceof EngineError) {
        res.status(err.statusCode).send(err.message);
    } else {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    requestLogger,
    authenticate,
    errorHandler
};
