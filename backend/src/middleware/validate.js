import ApiError from "../utils/ApiError.js";

const validate = (schema, property = 'body') => (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
        abortEarly: false, // Return all errors, not just the first one
        stripUnknown: true, // Remove fields not defined in the schema
    });
    if (error) {
        const details = error.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message.replace(/"/g, ''),
        }))

        return next(new ApiError(400, 'Validation failed', details));
    }
    req[property] = value;
    next();
}

export default validate;