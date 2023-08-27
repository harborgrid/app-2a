const fs = require('fs');
const path = require('path');

class LoggingService {
    constructor(logFilePath = path.join(__dirname, 'system.log')) {
        this.logFilePath = logFilePath;
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;
        fs.appendFileSync(this.logFilePath, logMessage);
    }

    error(err) {
        this.log(`ERROR: ${err.message}`);
    }
}

module.exports = LoggingService;
