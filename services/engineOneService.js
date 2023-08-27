const EngineOneModel = require('../models/engineOneModel');
const EngineError = require('../utilities/EngineError');
const logger = require('../utilities/logger'); // Assuming a logger utility is available

class EngineOneService {
    // Validation function
    validateInput(data) {
        // Implement validation logic here
        // For example, check if data fields are not empty, have the correct format, etc.
        return true; // Placeholder
    }

    async fetchEngineOneData(params) {
        try {
            // Use projection to fetch only necessary fields
            const data = await EngineOneModel.find(params, 'field1 field2'); // Replace 'field1 field2' with actual field names
            return data;
        } catch (error) {
            logger.error(`Failed to fetch data for Engine One: ${error.message}`);
            throw new EngineError('Failed to fetch data for Engine One', 500);
        }
    }

    async createEngineOneData(data) {
        try {
            if (!this.validateInput(data)) {
                throw new EngineError('Invalid input data for Engine One', 400);
            }
            const newData = new EngineOneModel(data);
            await newData.save();
            return newData;
        } catch (error) {
            logger.error(`Failed to create data for Engine One: ${error.message}`);
            throw new EngineError('Failed to create data for Engine One', 500);
        }
    }

    async updateEngineOneData(id, data) {
        try {
            if (!this.validateInput(data)) {
                throw new EngineError('Invalid input data for Engine One', 400);
            }
            const updatedData = await EngineOneModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedData) {
                throw new EngineError('Data not found for Engine One', 404);
            }
            return updatedData;
        } catch (error) {
            logger.error(`Failed to update data for Engine One: ${error.message}`);
            if (error instanceof EngineError) {
                throw error;
            }
            throw new EngineError('Failed to update data for Engine One', 500);
        }
    }

    async deleteEngineOneData(id) {
        try {
            const deletedData = await EngineOneModel.findByIdAndDelete(id);
            if (!deletedData) {
                throw new EngineError('Data not found for Engine One', 404);
            }
            return deletedData;
        } catch (error) {
            logger.error(`Failed to delete data for Engine One: ${error.message}`);
            if (error instanceof EngineError) {
                throw error;
            }
            throw new EngineError('Failed to delete data for Engine One', 500);
        }
    }
}

module.exports = new EngineOneService();
