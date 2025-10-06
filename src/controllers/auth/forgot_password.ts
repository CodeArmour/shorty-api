/**
 * @copyright 2025 omarcode
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';
import config from '@/config';
import { generatePasswordResetToken } from '@/lib/jwt';
import nodeMailerTransporter from '@/lib/nodemailer';
import { passwordResetEmail } from '@/mailTemplates/resetLink';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Types
 */
import type { Request, Response } from 'express';
import type { IUser } from '@/models/user';
type RequestBody = Pick<IUser, 'email'>;

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    // get email from request body
    const { email } = req.body as RequestBody;

    // find user by email (combined exists check and find)
    const user = await User.findOne({ email })
      .select('name passwordResetToken')
      .exec();

    // handle case when the user not found
    if (!user) {
      res.status(404).json({
        code: 'NotFound',
        message: 'User not found',
      });
      return;
    }

    // get the password reset token
    const passwordResetToken = generatePasswordResetToken({ email });

    // generate reset link
    const resetLink = `${config.CLIENT_URL}/reset-password?token=${passwordResetToken}`;

    // get email template
    const emailTemplate = passwordResetEmail({
      userName: user.name,
      resetLink,
      expiryTime: '1 hour',
    });

    // store the reset token in user data and save (do this BEFORE sending email)
    user.passwordResetToken = passwordResetToken;
    await user.save();

    // send the reset token to user email
    await nodeMailerTransporter.sendMail({
      from: `"${config.APP_NAME}" <${config.SMTP_AUTH_USERNAME}>`,
      to: email,
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html,
    });

    logger.info(`Password reset email sent to: ${email}`);

    // response with 204 no-content
    res.sendStatus(204);
  } catch (error) {
    logger.error('Error during reset password:', error);
    
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });
  }
};

export default forgotPassword;