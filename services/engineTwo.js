const { MongoClient } = require('mongodb');
const config = require('./config'); // Assuming there's a config.js in the root directory
const logger = require('./utilities/logger'); // Assuming there's a logger utility

/**
 * RuleEngine: Manages and evaluates rules.
 */
class RuleEngine {
    constructor() {
        this.rules = new Map();
    }

    addRule(name, fn, weight = 1) {
        if (typeof fn !== 'function') {
            throw new Error('Rule function must be a valid function.');
        }
        this.rules.set(name, { fn, weight });
        return this;
    }

    evaluate(data) {
        let decisionPoints = 0;
        let decisionMade = 'default';

        for (const [name, rule] of this.rules.entries()) {
            const result = rule.fn(data);
            if (rule.weight > decisionPoints) {
                decisionPoints = rule.weight;
                decisionMade = result;
            }
            if (decisionPoints === this.rules.size) break; // Optimization
        }

        return decisionMade;
    }
}

/**
 * NotificationService: Manages subscribers and sends notifications.
 */
class NotificationService {
    constructor() {
        this.subscribers = [];
    }

    subscribe(fn) {
        if (typeof fn !== 'function') {
            throw new Error('Subscriber must be a valid function.');
        }
        this.subscribers.push(fn);
    }

    notify(type, data) {
        this.subscribers.forEach(fn => fn({ type, data }));
    }
}

/**
 * DatabaseService: Abstracts database operations.
 */
class DatabaseService {
    constructor() {
        this.uri = config.MONGODB_URI; // Moved to a configuration file
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
    }

    async fetchData(collectionName, query) {
        await this.connect();
        const collection = this.client.db().collection(collectionName);
        return await collection.find(query).toArray();
    }

    async storeDecision(collectionName, decision) {
        await this.connect();
        const collection = this.client.db().collection(collectionName);
        await collection.insertOne({ decision, timestamp: Date.now() });
    }

    async close() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }
}

/**
 * OrchestrationEngine: Orchestrates the rule evaluation, notifications, and database operations.
 */
class OrchestrationEngine {
    constructor() {
        this.ruleEngine = new RuleEngine();
        this.notificationService = new NotificationService();
        this.databaseService = new DatabaseService();
    }

    async decide(data) {
        try {
            const decision = this.ruleEngine.evaluate(data);
            await this.databaseService.storeDecision('decisions', decision);
            this.notificationService.notify('decision', decision);
            logger.info(`Decision made: ${decision}`); // Logging
            return decision;
        } catch (error) {
            logger.error('Error in OrchestrationEngine:', error.message); // Enhanced error logging
            return 'Error occurred.';
        }
    }
}

module.exports = OrchestrationEngine;
