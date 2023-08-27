const EngineOneService = require('../services/engineOneService');
const logger = require('../utilities/logger');

class EngineOneController {
    static async handleResponse(promise, res) {
        try {
            const data = await promise;
            res.json(data);
        } catch (err) {
            logger.error(err.message);
            res.status(err.statusCode || 500).send(err.message);
        }
    }

    static getAll(req, res) {
        this.handleResponse(EngineOneService.fetchEngineOneData(), res);
    }

    static getById(req, res) {
        this.handleResponse(EngineOneService.fetchEngineOneData({ id: req.params.id }), res);
    }

    static create(req, res) {
        this.handleResponse(EngineOneService.createEngineOneData(req.body), res);
    }

    static update(req, res) {
        this.handleResponse(EngineOneService.updateEngineOneData(req.params.id, req.body), res);
    }

    static delete(req, res) {
        this.handleResponse(EngineOneService.deleteEngineOneData(req.params.id), res);
    }
}

module.exports = EngineOneController;
