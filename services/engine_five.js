const { MongoClient } = require('mongodb');
const config = require('../config');
const logger = require('../utilities/logger');
const notificationService = require('../services/notificationService'); // Assuming a notification service

class RealTimeMonitoringEngine {
    constructor() {
        this.uri = config.MONGODB_URI;
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.alertThresholds = {
            "highPriority": 10,
            "mediumPriority": 5
        };
    }

    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
    }

    async trackDecision(decision) {
        await this.connect();
        const collection = this.client.db().collection('decisionLogs');
        await collection.insertOne({ decision, timestamp: Date.now() });

        // Check for alert conditions
        if (decision.priority === "high" && decision.count > this.alertThresholds.highPriority) {
            notificationService.sendAlert(decision);
        } else if (decision.priority === "medium" && decision.count > this.alertThresholds.mediumPriority) {
            notificationService.sendAlert(decision);
        }

        logger.info(`Tracked decision: ${JSON.stringify(decision)}`);
    }

    async close() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }
}

module.exports = RealTimeMonitoringEngine;
