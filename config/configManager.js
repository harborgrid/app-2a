const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const config = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    // Add other configurations as needed
};

module.exports = config;
