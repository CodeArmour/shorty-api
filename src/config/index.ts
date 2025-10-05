/**
 * @copyright 2025 omarcode
 * @license Apach-2.0
 */

/**
 * Node modules
 */
import dotenv from 'dotenv';

dotenv.config();
/**
 * Constants
 */
const CORS_WHITELIST = ['https://shortly.omarcode.com'];
const _1H_IN_MILLISECONDS = 1000*60*60;
const _7DAYS_IN_MILLISECONDS = 1000*60*60*24*7;

const config = {
    PORT: process.env.PORT!,
    NODE_ENV: process.env.NODE_ENV!,
    CORS_WHITELIST,
    LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN!,
    LOGTAIL_INGESTING_HOST: process.env.LOGTAIL_INGESTING_HOST!,
    WINDOW_MS: _1H_IN_MILLISECONDS,
    MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI!,
    WHITELISTED_EMAILS: process.env.WHITELISTED_EMAILS?.split(','),

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    COOKIE_MAX_AGE: _7DAYS_IN_MILLISECONDS,
};

export default config;