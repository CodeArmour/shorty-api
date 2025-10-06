/**
 * @copyright 2025 omarcode
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';
import config from '@/config';
import { ResetLinkPayload, verifyPasswordResetToken } from '@/lib/jwt';
import nodeMailerTransporter from '@/lib/nodemailer';
import { passResetInfoTemplete } from '@/mailTemplates/passResetInfo';

/**
 * Models
 */
import User, { IUser } from '@/models/user';

/**
 * Types
 */
import type { Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
type RequestQuery = { token: string };
type RequestBody = Pick<IUser, 'password'>;

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.query as RequestQuery;
    const { password } = req.body as RequestBody;

    // Verify the reset token
    const { email } = verifyPasswordResetToken(token) as ResetLinkPayload;

    // Find user and verify token matches
    const user = await User.findOne({ 
      email
    }).select('name email passwordResetToken').exec();

    if (!user) return;

    if (!user?.passwordResetToken) {
      res.status(404).json({
        code: 'TokenNotFound',
        message: 'This token is already used',
      });
      return;
    }

    // Update password and clear reset token
    user.password = password; // Make sure you have password hashing in your model
    user.passwordResetToken = null;
    await user.save();

    // Response 204 no-content
    res.sendStatus(204);

    // Send success notification email
    const emailTemplate = passResetInfoTemplete({
      userName: user.name,
      supportEmail: config.SUPPORT_EMAIL,
      supportUrl: config.SUPPORT_URL,
    });

    await nodeMailerTransporter.sendMail({
      from: `"${config.APP_NAME}" <${config.SMTP_AUTH_USERNAME}>`,
      to: user.email,
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html,
    });

    logger.info(`Password reset successful for: ${user.email}`);

  } catch (error) {
    logger.error('Error during password reset:', error);

    if(error instanceof TokenExpiredError){
        res.status(401).json({
            code: 'ResetTokenExpired',
            message: 'Your password reset token has been expired'
        });
        return;
    };

    if(error instanceof JsonWebTokenError){
        res.status(401).json({
            code: 'ResetTokenError',
            message: 'Invalid reset password token'
        });
        return;
    };

    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });
  }
};

export default resetPassword;