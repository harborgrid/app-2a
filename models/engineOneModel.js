const mongoose = require('mongoose');

// Define the schema for Engine One
const engineOneSchema = new mongoose.Schema({
    dataFieldOne: {
        type: String,
        required: true,
        trim: true
    },
    dataFieldTwo: {
        type: Number,
        required: true,
        min: 0
    },
    dataFieldThree: {
        type: Date,
        default: Date.now
    },
    // ... other fields as required ...
    metadata: {
        createdBy: {
            type: String,
            required: true
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        }
    }
});

// Add any necessary methods or statics to the schema
engineOneSchema.statics.findByFieldOne = function(value) {
    return this.find({ dataFieldOne: value });
};

engineOneSchema.methods.updateFieldTwo = function(value) {
    this.dataFieldTwo = value;
    return this.save();
};

// Create the model using the schema
const EngineOneModel = mongoose.model('EngineOne', engineOneSchema);

module.exports = EngineOneModel;
