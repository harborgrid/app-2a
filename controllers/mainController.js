const EngineOne = require('../models/engineOneModel');
const EngineTwo = require('../models/engineTwoModel');
const EngineThree = require('../models/engineThreeModel');
const EngineUtility = require('../utilities/engineUtility');
const EngineError = require('../utilities/EngineError');

module.exports = {
    async executeEngineOne(req, res, next) {
        try {
            const data = req.body;
            const result = await EngineOne.process(data);
            res.json(result);
        } catch (error) {
            next(new EngineError('Engine One failed to execute', 500));
        }
    },

    async executeEngineTwo(req, res, next) {
        try {
            const data = req.body;
            const result = await EngineTwo.process(data);
            res.json(result);
        } catch (error) {
            next(new EngineError('Engine Two failed to execute', 500));
        }
    },

    async executeEngineThree(req, res, next) {
        try {
            const data = req.body;
            const result = await EngineThree.process(data);
            res.json(result);
        } catch (error) {
            next(new EngineError('Engine Three failed to execute', 500));
        }
    },

    // ... similar methods for other engines

    errorHandler(err, req, res, next) {
        if (err instanceof EngineError) {
            res.status(err.statusCode).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
