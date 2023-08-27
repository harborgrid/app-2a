const rateLimit = require('express-rate-limit');

class RateLimiter {
    constructor(maxRequests = 100, windowMs = 15 * 60 * 1000) { // Default: 100 requests per 15 minutes
        this.limiter = rateLimit({
            windowMs: windowMs,
            max: maxRequests,
            message: 'Too many requests, please try again later.'
        });
    }

    getMiddleware() {
        return this.limiter;
    }
}

module.exports = RateLimiter;
