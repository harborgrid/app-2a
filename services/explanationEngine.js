const { MongoClient } = require('mongodb');
const config = require('../config');
const logger = require('../utilities/logger');

class ExplanationEngine {
    constructor() {
        this.uri = config.MONGODB_URI;
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
    }

    async logExplanation(decision, explanation) {
        await this.connect();
        const collection = this.client.db().collection('explanations');
        await collection.insertOne({ decision, explanation, timestamp: Date.now() });
        logger.info(`Logged explanation for decision: ${JSON.stringify(decision)}`);
    }

    async getExplanation(decision) {
        await this.connect();
        const collection = this.client.db().collection('explanations');
        return await collection.findOne({ decision });
    }

    async close() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }
}

module.exports = ExplanationEngine;
