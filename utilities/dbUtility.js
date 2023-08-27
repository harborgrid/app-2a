const { MongoClient } = require('mongodb');

class DatabaseUtility {
    constructor() {
        this.uri = 'YOUR_MONGODB_CONNECTION_STRING';
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

    async storeData(collectionName, data) {
        await this.connect();
        const collection = this.client.db().collection(collectionName);
        await collection.insertOne(data);
    }

    async close() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }
}

module.exports = DatabaseUtility;
