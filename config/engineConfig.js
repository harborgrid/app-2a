const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    // General server configuration
    SERVER_PORT: process.env.SERVER_PORT || 3000,

    // Database configurations
    DB_URI: process.env.DB_URI,
    DB_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true,
        w: 'majority'
    },

    // Engine One specific configurations
    ENGINE_ONE: {
        API_ENDPOINT: process.env.ENGINE_ONE_API_ENDPOINT || 'http://localhost:3001',
        TIMEOUT: process.env.ENGINE_ONE_TIMEOUT || 5000
    },

    // Engine Two specific configurations
    ENGINE_TWO: {
        API_ENDPOINT: process.env.ENGINE_TWO_API_ENDPOINT || 'http://localhost:3002',
        TIMEOUT: process.env.ENGINE_TWO_TIMEOUT || 5000
    },

    // ... configurations for other engines ...

    // Security configurations
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',

    // Other configurations can be added as needed
};
