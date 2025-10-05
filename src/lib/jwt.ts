/**
 * @copyright 2025 omarcode
 * @license Apach-2.0
 */

/**
 * Node modules import
 */
import jwt from "jsonwebtoken";

/**
 * Custom modules import
 */
import config from "@/config";

/**
 * Types
 */
import type { Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export type TokenPayload = { userId: Types.ObjectId };
export type ResetLinkPayload = { email: string };

/**
 * Generates a JWT access token with a 30-minute expiration.
 * 
 * -signs the provided payload using the configured access token secret.
 */
const generateAccessToken = (payload: TokenPayload) => {
    const token = jwt.sign(payload, config.JWT_ACCESS_SECRET,{
        expiresIn: '30m',
    });
    return token;
}

/**
 * Generate a JWT refresh token with a 7 days expiration
 */
const generateRefreshToken = (payload: TokenPayload) => {
    const token = jwt.sign(payload, config.JWT_REFRESH_SECRET,{
        expiresIn: '7d',
    });
    return token;
};

/**
 * Verify accessToken
 */
const verifyAccessToken = (accessToken: string): string | JwtPayload => {
    return jwt.verify(accessToken, config.JWT_ACCESS_SECRET);
};


/**
 * Verify refreshToken
 */
const verifyRefreshToken = (refreshToken: string): string | JwtPayload => {
    return jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
};



export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };