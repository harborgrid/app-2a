const DecisionEngine = require('./engine_four');

class TaskManagementEngine {
    constructor() {
        this.decisionEngine = new DecisionEngine();
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    executeTasks(data, currentTime) {
        if (this.decisionEngine.decide(data, currentTime)) {
            for (const task of this.tasks) {
                task.execute();
            }
        }
    }
}

module.exports = TaskManagementEngine;