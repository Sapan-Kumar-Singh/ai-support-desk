
import Joi from 'joi';

const objectId = Joi.string()
    .guid({ version: ['uuidv4'] })
    .messages({
        'string.guid': '{{#label}} must be a valid UUID v4'
    });
const idParamSchema = Joi.object({
    id: objectId.required()
})

export { idParamSchema }