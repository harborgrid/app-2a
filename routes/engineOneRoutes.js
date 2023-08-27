const express = require('express');
const router = express.Router();
const EngineOneModel = require('./engineOneModel');

// Middleware for logging
router.use((req, res, next) => {
    console.log(`EngineOne Route Accessed: ${req.path}`);
    next();
});

// Get all data for Engine One
router.get('/', async (req, res) => {
    try {
        const data = await EngineOneModel.find();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get specific data by ID
router.get('/:id', async (req, res) => {
    try {
        const data = await EngineOneModel.findById(req.params.id);
        if (!data) {
            return res.status(404).send('Data not found');
        }
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add new data
router.post('/', async (req, res) => {
    try {
        const newData = new EngineOneModel(req.body);
        await newData.save();
        res.status(201).json(newData);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update data by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedData = await EngineOneModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedData) {
            return res.status(404).send('Data not found');
        }
        res.json(updatedData);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete data by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await EngineOneModel.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            return res.status(404).send('Data not found');
        }
        res.json({ message: 'Data deleted successfully' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
