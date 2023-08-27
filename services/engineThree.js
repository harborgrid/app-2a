const { MongoClient } = require('mongodb');
const config = require('../config'); // Assuming a config.js for configurations
const logger = require('../utilities/logger'); // Assuming a logger utility

/**
 * TemporalConditionsEngine: Evaluates temporal conditions and logs events.
 */
class TemporalConditionsEngine {
    constructor() {
        this.events = new Map();
        this.uri = config.MONGODB_URI; // Use a configuration file for security
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
    }

    async logEvent(eventName, data, metadata) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push({ data, metadata, timestamp: Date.now() });

        // Store the event in the database
        await this.connect();
        const collection = this.client.db().collection('events');
        await collection.insertOne({ eventName, data, metadata, timestamp: Date.now() });

        logger.info(`Logged event: ${eventName}`); // Logging for traceability
    }

    async checkPattern(eventName, times, duration) {
        const events = this.events.get(eventName) || [];
        const now = Date.now();
        const relevantEvents = events.filter(event => now - event.timestamp <= duration);

        if (relevantEvents.length >= times) {
            logger.info(`Pattern detected for event: ${eventName}`); // Logging for insights
            return true;
        }
        return false;
    }

    async close() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }
}

module.exports = TemporalConditionsEngine;
