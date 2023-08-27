const Joi = require('joi'); // Joi is a popular validation library for JavaScript

const validateData = (data, schema) => {
    const { error } = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return true;
};

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    // ... other user-related fields and their validation rules
});

// Additional schemas for other data types can be added here

module.exports = {
    validateData,
    userSchema,
    // ... export other schemas as needed
};
