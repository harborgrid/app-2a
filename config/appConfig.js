const dotenv = require('dotenv');

// Load environment variables from a .env file into process.env
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'your_default_mongodb_connection_string',
    SECRET_KEY: process.env.SECRET_KEY || 'your_default_secret_key',
    // ... any other configurations
};
