const mongoose = require('mongoose');

const DecisionSchema = new mongoose.Schema({
    input: Object,
    decision: Object,
    optimization: Object,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Decision', DecisionSchema);
