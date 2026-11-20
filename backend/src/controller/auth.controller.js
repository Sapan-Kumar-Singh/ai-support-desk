import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { registerService, loginService, logoutService, refreshTokenService } from "../service/auth.service.js";

const REFRESH_COOKIE = 'refreshToken';

const refreshCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/api/auth',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };
};

const sendAuthResponse = (res, { user, accessToken, refreshToken }, statusCode, message) => {
    res.cookie(REFRESH_COOKIE, refreshToken, refreshCookieOptions());
    res.locals.userId = user.id;
    return sendSuccess(res, { statusCode, message, data: { user, accessToken } })
}
const registerController = asyncHandler(async (req, res) => {
    const user = await registerService(req.body);
    return sendSuccess(res, {
        statusCode: 201,
        message: 'Registration successful, please log in',
        data: user
    })
})

const loginController = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await loginService(req.body);
    sendAuthResponse(res, { user, accessToken, refreshToken }, 200, 'Login successful');
})

const refreshTokenController = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await refreshTokenService(req.cookie[REFRESH_COOKIE]);
    sendAuthResponse(res, { user, accessToken, refreshToken }, 200, 'Token refreshed');
})

const logoutController = asyncHandler(async (req, res) => {
    res.locals.userId = await logoutService(req.cookies[REFRESH_COOKIE]);

    const { maxAge, ...clearOptions } = refreshCookieOptions();

    res.clearCookie(REFRESH_COOKIE, clearOptions);

    return sendSuccess(res, {
        message: 'Logged out successfully'
    });
});

export { registerController, loginController, logoutController, refreshTokenController }