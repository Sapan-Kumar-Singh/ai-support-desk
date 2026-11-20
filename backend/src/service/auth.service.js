
import User from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import { generateAccessToken, generateRefreshToken, hashToken, verifyRefreshToken } from "./token.service.js";
import { sanitizeUser } from "../utils/common.js";
const issueTokens = async (user) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await User.update({
        refreshToken: hashToken(refreshToken)
    }, {
        where: { id: user.id }
    })

    return { accessToken, refreshToken };
}



const registerService = async ({ name, email, password }) => {
    const existingUser = await User.findOne({
        where: { email }
    });
    if (existingUser) {
        throw new ApiError(409, "Email already registered")
    }
    const user = await User.create({ name, email, password });
    return sanitizeUser(user);
}


const loginService = async ({ email, password }) => {

    const user = await User.unscoped().findOne({
        where: { email }
    });

    // Check user existence
    if (!user || !user.password) {
        throw new ApiError(401, 'Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid email or password');
    }

    // Check account status
    if (!user.isActive) {
        throw new ApiError(403, 'Your account has been deactivated');
    }

    // Generate tokens
    const token = await issueTokens(user);

    // Remove sensitive information
    const sanitizedUser = sanitizeUser(user);

    return {
        user: sanitizedUser,
        ...token
    };
};



const refreshTokenService = async (refreshToken) => {
    if (!refreshToken) {
        throw new ApiError(401, 'Refresh token missing');
    }

    const payload = verifyRefreshToken(refreshToken);
    const user = await User.unscoped().findOne({
        where: { id: payload.id }
    });

    if (!user || !user.isActive || !user.refreshToken !== hashToken(refreshToken)) {
        throw new ApiError(401, 'Invalid refresh token');
    }
    const token = await issueTokens(user);
    const sanitazeUser = sanitizeUser(user);
    return { user: sanitazeUser, ...token }
}

const logoutService = async (refreshToken) => {
    if (!refreshToken) return;
    try {
        const payload = verifyRefreshToken(refreshToken);
        await User.update({ refreshToken: null }, {
            where: {
                id: payload.id
            }
        })
        return payload.id;
    } catch (error) {
        return null;
    }

}

export { registerService, loginService, logoutService, refreshTokenService }