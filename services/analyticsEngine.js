const { MongoClient } = require('mongodb');
const config = require('../config');
const logger = require('../utilities/logger');

class AnalyticsEngine {
    constructor() {
        this.uri = config.MONGODB_URI;
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
    }

    async logDecision(decision, engineName) {
        await this.connect();
        const collection = this.client.db().collection('analytics');
        await collection.insertOne({ decision, engineName, timestamp: Date.now() });
        logger.info(`Logged decision from ${engineName}: ${decision}`);
    }

    async getDecisionsByEngine(engineName) {
        await this.connect();
        const collection = this.client.db().collection('analytics');
        return await collection.find({ engineName }).toArray();
    }

    async getDecisionTrends() {
        await this.connect();
        const collection = this.client.db().collection('analytics');
        // Aggregate and analyze trends based on decisions
        // This can be expanded upon based on specific needs
    }

    async close() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }
}

module.exports = AnalyticsEngine;
