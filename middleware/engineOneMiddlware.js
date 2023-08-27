const EngineError = require('../utilities/EngineError');
const EngineOneModel = require('../models/engineOneModel');

class EngineOneMiddleware {
    async validateEngineOneData(req, res, next) {
        const { dataField1, dataField2 } = req.body;
        
        if (!dataField1 || !dataField2) {
            return res.status(400).json({ error: 'Missing required fields for Engine One.' });
        }

        // Further validation logic can be added here

        next();
    }

    async checkEngineOneDataExists(req, res, next) {
        const { id } = req.params;

        try {
            const data = await EngineOneModel.findById(id);
            if (!data) {
                throw new EngineError('Data not found for Engine One', 404);
            }
            req.engineOneData = data; // Store data in request object for further use
            next();
        } catch (error) {
            if (error instanceof EngineError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Failed to fetch data for Engine One.' });
        }
    }
}

module.exports = new EngineOneMiddleware();
