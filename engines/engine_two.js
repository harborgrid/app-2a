const ConditionsEngineAlpha = require('./engine_one');

class OrchestrationEngine {
    constructor() {
        this.conditionsEngine = new ConditionsEngineAlpha();
    }

    orchestrate(data) {
        return this.conditionsEngine.evaluate(data);
    }
}

module.exports = OrchestrationEngine;
