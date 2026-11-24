import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import ApiError from '../utils/ApiError.js';
const generateAccessToken = (user) =>
    jwt.sign({ id: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    })

const generateRefreshToken = (user) =>
    jwt.sign({ id: user.id, jti: crypto.randomUUID() }, process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    )

const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        throw new ApiError(401, 'Invalid or expired token');
    }
};

const verifyAccessToken = (token) => verifyToken(token, process.env.JWT_ACCESS_SECRET);
const verifyRefreshToken = (token) => verifyToken(token, process.env.JWT_REFRESH_SECRET);

// Only a hash of the refresh token is stored in the database
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

export { generateAccessToken, generateRefreshToken, hashToken, verifyAccessToken, verifyRefreshToken }