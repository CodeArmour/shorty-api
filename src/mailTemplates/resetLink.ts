/**
 * @copyright 2025 omarcode
 * @license Apache-2.0
 */

interface EmailTemplateParams {
  userName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface PasswordResetParams extends EmailTemplateParams {
  resetLink: string;
  expiryTime?: string;
}



/**
 * Password reset email template
 */
export const passwordResetEmail = ({ userName, resetLink, expiryTime = '1 hour' }: PasswordResetParams) => {
  return {
    subject: 'Password Reset Request',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #ff9800; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { display: inline-block; padding: 12px 24px; background-color: #ff9800; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .warning { background-color: #fff3cd; border-left: 4px solid #ff9800; padding: 10px; margin: 15px 0; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset</h1>
            </div>
            <div class="content">
              <h2>Hello ${userName},</h2>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              <a href="${resetLink}" class="button">Reset Password</a>
              <div class="warning">
                <strong>Important:</strong> This link will expire in ${expiryTime}.
              </div>
              <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Hello ${userName},\n\nWe received a request to reset your password. Visit this link to create a new password:\n\n${resetLink}\n\nThis link will expire in ${expiryTime}.\n\nIf you didn't request a password reset, please ignore this email.\n\n© 2025 Your Company. All rights reserved.`
  };
};

