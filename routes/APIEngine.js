const { MongoClient } = require('mongodb');
const config = require('../config');
const logger = require('../utilities/logger');

class APIEngine {
    constructor() {
        this.uri = config.MONGODB_URI;
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
    }

    async logAPICall(endpoint, method, responseTime) {
        await this.connect();
        const collection = this.client.db().collection('apiLogs');
        await collection.insertOne({ endpoint, method, responseTime, timestamp: Date.now() });
        logger.info(`Logged API call to ${endpoint} using ${method}. Response time: ${responseTime}ms`);
    }

    async getAPILog(endpoint) {
        await this.connect();
        const collection = this.client.db().collection('apiLogs');
        return await collection.find({ endpoint }).toArray();
    }

    async optimizeAPIRoutes() {
        // Logic to analyze API logs and suggest optimizations
        // This can be expanded upon based on specific needs
    }

    async close() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }
}

module.exports = APIEngine;
