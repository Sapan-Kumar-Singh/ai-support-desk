
import Joi from 'joi';

const objectId = Joi.string().hex().length(24).messages({ 'string.length': '{{#label}} must be a valid id' });
const idParamSchema = Joi.object({
    id: objectId.required()
})

export { idParamSchema }