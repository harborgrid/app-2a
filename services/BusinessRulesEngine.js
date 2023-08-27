class BusinessRulesEngine {
    constructor(decisionTable = []) {
        this.decisionTable = decisionTable;
    }

    evaluate(input) {
        for (let rule of this.decisionTable) {
            if (rule.condition(input)) {
                return rule.action(input);
            }
        }
        return null;
    }
}

module.exports = BusinessRulesEngine;
