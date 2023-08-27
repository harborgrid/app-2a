const mongoose = require('mongoose');

class DatabaseUtility {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    connect() {
        mongoose.connect(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Connected to the database'))
            .catch(err => console.error('Database connection error:', err));
    }

    disconnect() {
        mongoose.disconnect();
    }
}

module.exports = DatabaseUtility;
