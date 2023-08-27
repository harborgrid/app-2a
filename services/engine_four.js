const { MongoClient } = require('mongodb');
const config = require('../config');
const logger = require('../utilities/logger');
const mlModel = require('../models/predictiveModel'); // Assuming a machine learning model for predictions

class PredictiveDecisionEngine {
    constructor() {
        this.uri = config.MONGODB_URI;
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
    }

    async fetchHistoricalData(criteria) {
        await this.connect();
        const collection = this.client.db().collection('historicalData');
        return await collection.find(criteria).toArray();
    }

    async makeDecision(inputData) {
        const historicalData = await this.fetchHistoricalData({ relatedField: inputData.field });
        const combinedData = { ...inputData, historicalData };

        const prediction = mlModel.predict(combinedData); // Use the ML model to make a prediction

        logger.info(`Predictive decision made based on input: ${JSON.stringify(inputData)} - Result: ${prediction}`);

        return prediction;
    }

    async close() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }
}

module.exports = PredictiveDecisionEngine;
