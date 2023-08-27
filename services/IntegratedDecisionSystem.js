const BusinessRulesEngine = require('./BusinessRulesEngine');
const OptimizationEngine = require('./OptimizationEngine');
const engineOne = require('./engine_one');
const engineTwo = require('./engine_two');
const engineThree = require('./engine_three');
const engineFour = require('./engine_four');

class IntegratedDecisionSystem {
    constructor() {
        this.businessRulesEngine = new BusinessRulesEngine([
            { condition: engineOne.condition, action: engineOne.action },
            { condition: engineTwo.condition, action: engineTwo.action },
            { condition: engineThree.condition, action: engineThree.action }
        ]);

        this.optimizationEngine = new OptimizationEngine(engineFour.model);
    }

    makeDecision(input) {
        const decision = this.businessRulesEngine.evaluate(input);
        const optimization = this.optimizationEngine.optimize(decision);
        return {
            decision: decision,
            optimization: optimization
        };
    }
}

module.exports = IntegratedDecisionSystem;
