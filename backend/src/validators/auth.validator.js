import Joi from 'joi';
const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string()
        .min(8)
        .max(64)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)/)
        .required()
        .messages({ 'string.pattern.base': 'password must contain at least one letter and one number' }),
}).required().messages({
    'any.required': 'Request body is required',
    'object.base': 'Request body must be a valid JSON object',
});

const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string()
        .min(8)
        .max(64)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)/)
        .required()
        .messages({ 'string.pattern.base': 'password must contain at least one letter and one number' }),

}).required().messages({
    'any.required': 'Request body is required',
    'object.base': 'Request body must be a valid JSON object',
})

export { registerSchema, loginSchema }