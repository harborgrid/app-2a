class TemporalConditionsEngine {
    constructor() {
        this.temporalRules = [];
    }

    addTemporalRule(rule) {
        this.temporalRules.push(rule);
    }

    evaluate(data, currentTime) {
        for (const rule of this.temporalRules) {
            if (!rule.evaluate(data, currentTime)) {
                return false;
            }
        }
        return true;
    }
}

module.exports = TemporalConditionsEngine;
