import { verifyAccessToken } from "../service/token.service.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import User from "../model/user.model.js";

const authenticate = asyncHandler(async (req, res, next) => {
    const [scheme, token] = (req.headers.authorization || '').split(' ');
    if (scheme !== 'Bearer' || !token) {
        throw new ApiError(401, 'Authentication required');
    }


    const payload = verifyAccessToken(token);
    // Load the user so role changes / deactivation take effect immediately
    const user = await User.findOne({
        where: { id: payload.id }
    });

    if (!user || !user.isActive) {
        throw new ApiError(401, 'User not found or inactive');
    }

    req.user = user;
    next();
});

export default authenticate;