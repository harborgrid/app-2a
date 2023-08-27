const EngineTwoModel = require('../models/engineTwoModel');
const EngineError = require('../utilities/EngineError');
const logger = require('../utilities/logger'); // Assuming a logger utility is available

class EngineTwoService {
    // Validation function
    validateInput(data) {
        // Implement validation logic here
        return true; // Placeholder
    }

    async fetchEngineTwoData(params) {
        try {
            const data = await EngineTwoModel.find(params);
            return data;
        } catch (error) {
            logger.error(`Failed to fetch data for Engine Two: ${error.message}`);
            throw new EngineError('Failed to fetch data for Engine Two', 500);
        }
    }

    async createEngineTwoData(data) {
        try {
            if (!this.validateInput(data)) {
                throw new EngineError('Invalid input data for Engine Two', 400);
            }
            const newData = new EngineTwoModel(data);
            await newData.save();
            return newData;
        } catch (error) {
            logger.error(`Failed to create data for Engine Two: ${error.message}`);
            throw new EngineError('Failed to create data for Engine Two', 500);
        }
    }

    async updateEngineTwoData(id, data) {
        try {
            if (!this.validateInput(data)) {
                throw new EngineError('Invalid input data for Engine Two', 400);
            }
            const updatedData = await EngineTwoModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedData) {
                throw new EngineError('Data not found for Engine Two', 404);
            }
            return updatedData;
        } catch (error) {
            logger.error(`Failed to update data for Engine Two: ${error.message}`);
            if (error instanceof EngineError) {
                throw error;
            }
            throw new EngineError('Failed to update data for Engine Two', 500);
        }
    }

    async deleteEngineTwoData(id) {
        try {
            const deletedData = await EngineTwoModel.findByIdAndDelete(id);
            if (!deletedData) {
                throw new EngineError('Data not found for Engine Two', 404);
            }
            return deletedData;
        } catch (error) {
            logger.error(`Failed to delete data for Engine Two: ${error.message}`);
            if (error instanceof EngineError) {
                throw error;
            }
            throw new EngineError('Failed to delete data for Engine Two', 500);
        }
    }
}

module.exports = new EngineTwoService();
