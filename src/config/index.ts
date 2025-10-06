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
const _1H_IN_MILLISECONDS = 1000 * 60 * 60;
const _7DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;

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
  JWT_PASSWORD_RESET_SECRET: process.env.JWT_PASSWORD_RESET_SECRET!,
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_AUTH_USERNAME: process.env.SMTP_AUTH_USERNAME || '',
  SMTP_AUTH_PASS: process.env.SMTP_AUTH_PASS || '',
  APP_NAME: process.env.APP_NAME || 'Shorty',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || 'support@yourapp.com',
  SUPPORT_URL: process.env.SUPPORT_URL || 'https://yourapp.com/support',
};

export default config;
