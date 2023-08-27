const { MongoClient } = require('mongodb');
const config = require('../config');
const logger = require('../utilities/logger');

class UserBehaviorEngine {
    constructor() {
        this.uri = config.MONGODB_URI;
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
    }

    async logUserInteraction(userId, interaction) {
        await this.connect();
        const collection = this.client.db().collection('userInteractions');
        await collection.insertOne({ userId, interaction, timestamp: Date.now() });
        logger.info(`Logged interaction for user ${userId}: ${JSON.stringify(interaction)}`);
    }

    async getUserInteractions(userId) {
        await this.connect();
        const collection = this.client.db().collection('userInteractions');
        return await collection.find({ userId }).toArray();
    }

    async analyzeUserBehavior(userId) {
        const interactions = await this.getUserInteractions(userId);
        // Analyze interactions to identify patterns and provide insights
        // This can be expanded upon based on specific needs
        return interactions; // Placeholder for now
    }

    async close() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }
}

module.exports = UserBehaviorEngine;
