import Joi from 'joi';

const categorySchema = Joi.object({
    name: Joi.string().trim().min(10).max(100).required(),
    description: Joi.string().trim().min(50).required()
}).required().messages({
    'any.required': 'Request body is required',
    'object.base': 'Request body must be a valid JSON object',
});

const updateCategorySchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100),

    description: Joi.string()
        .trim()
        .max(500)
        .allow('', null)
}).min(1).required().messages({
    'object.min': 'At least one field is required to update category',
    'object.base': 'Request body must be a valid object',
    'any.required': 'Request body is required'
});

const updateCategoryStatusSchema = Joi.object({
    isActive: Joi.boolean()
        .required()
}).required().messages({
    'any.required': 'isActive field is required',
    'boolean.base': 'isActive must be true or false',
    'object.base': 'Request body must be a valid object'
});

export { categorySchema, updateCategorySchema, updateCategoryStatusSchema };