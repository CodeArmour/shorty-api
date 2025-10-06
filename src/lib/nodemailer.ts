/**
 * @copyright 2025 omarcode
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import nodemailer from 'nodemailer';

/**
 * Custom Modules
 */
import config from '@/config';
import { logger } from '@/lib/winston';

const nodeMailerTransporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE, // true for 465, false for other ports
  auth: {
    user: config.SMTP_AUTH_USERNAME,
    pass: config.SMTP_AUTH_PASS,
  },
});

// Verify connection configuration
nodeMailerTransporter.verify((error, success) => {
  if (error) {
    logger.error('SMTP connection error:', error);
  } else {
    logger.info('SMTP server is ready to send emails');
  }
});

export default nodeMailerTransporter;