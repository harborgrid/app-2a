const express = require('express');
const router = express.Router();
const ExplanationEngine = require('../services/explanationEngine');

const explanationEngine = new ExplanationEngine();

router.get('/explanation/:decision', async (req, res) => {
    try {
        const decision = req.params.decision;
        const explanation = await explanationEngine.getExplanation(decision);
        if (explanation) {
            res.json(explanation);
        } else {
            res.status(404).json({ message: 'Explanation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
