class ConditionsEngineAlpha {
    constructor() {
        this.rules = [];
    }

    addRule(rule) {
        this.rules.push(rule);
    }

    evaluate(data) {
        for (const rule of this.rules) {
            if (!rule.evaluate(data)) {
                return false;
            }
        }
        return true;
    }
}

module.exports = ConditionsEngineAlpha;
