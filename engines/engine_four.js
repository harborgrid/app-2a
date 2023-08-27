const OrchestrationEngine = require('./engine_two');
const TemporalConditionsEngine = require('./engine_three');

class DecisionEngine {
    constructor() {
        this.orchestrationEngine = new OrchestrationEngine();
        this.temporalEngine = new TemporalConditionsEngine();
    }

    decide(data, currentTime) {
        if (!this.orchestrationEngine.orchestrate(data)) {
            return false;
        }
        if (!this.temporalEngine.evaluate(data, currentTime)) {
            return false;
        }
        return true;
    }
}

module.exports = DecisionEngine;
