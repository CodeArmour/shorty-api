/**
 * @copyright 2025 omarcode
 * @license Apache-2.0
 */

interface PasswordResetSuccessParams {
  userName: string;
  supportEmail?: string;
  supportUrl?: string;
}

/**
 * Password reset success notification email template
 */
export const passResetInfoTemplete = ({
  userName,
  supportEmail = 'support@yourapp.com',
  supportUrl = 'https://yourapp.com/support',
}: PasswordResetSuccessParams) => {
  return {
    subject: 'Your Password Has Been Reset Successfully',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
              background-color: #ffffff;
            }
            .header { 
              background-color: #4CAF50; 
              color: white; 
              padding: 30px 20px; 
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .check-icon {
              font-size: 48px;
              margin-bottom: 10px;
            }
            .content { 
              padding: 30px 20px; 
              background-color: #f9f9f9;
            }
            .content h2 {
              color: #333;
              margin-top: 0;
            }
            .info-box {
              background-color: #e8f5e9;
              border-left: 4px solid #4CAF50;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .warning-box {
              background-color: #fff3cd;
              border-left: 4px solid #ff9800;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .support-section {
              background-color: #ffffff;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
              text-align: center;
              border: 1px solid #e0e0e0;
            }
            .button { 
              display: inline-block; 
              padding: 12px 30px; 
              background-color: #2196F3; 
              color: white !important; 
              text-decoration: none; 
              border-radius: 4px; 
              margin: 15px 0;
              font-weight: bold;
            }
            .button:hover {
              background-color: #1976D2;
            }
            .footer { 
              text-align: center; 
              padding: 20px; 
              font-size: 12px; 
              color: #666;
              border-top: 1px solid #e0e0e0;
              margin-top: 20px;
            }
            .footer a {
              color: #2196F3;
              text-decoration: none;
            }
            ul {
              padding-left: 20px;
            }
            ul li {
              margin: 8px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="check-icon">✓</div>
              <h1>Password Reset Successful</h1>
            </div>
            
            <div class="content">
              <h2>Hello ${userName},</h2>
              
              <div class="info-box">
                <strong>✓ Success!</strong> Your password has been reset successfully.
              </div>
              
              <p>Your account password was recently changed. You can now log in with your new password.</p>
              
              <div class="warning-box">
                <strong>⚠️ Didn't make this change?</strong><br>
                If you did not reset your password, your account may be compromised. Please contact our support team immediately and consider the following actions:
                <ul>
                  <li>Reset your password again</li>
                  <li>Enable two-factor authentication if available</li>
                  <li>Review your recent account activity</li>
                </ul>
              </div>
              
              <h3>Security Tips:</h3>
              <ul>
                <li>Never share your password with anyone</li>
                <li>Use a unique password for each account</li>
                <li>Consider using a password manager</li>
                <li>Enable two-factor authentication when possible</li>
              </ul>
              
              <div class="support-section">
                <h3>Need Help?</h3>
                <p>If you have any questions or concerns about your account security, our support team is here to help.</p>
                <a href="${supportUrl}" class="button">Contact Support</a>
                <p style="margin-top: 15px; font-size: 14px;">
                  Or email us at: <a href="mailto:${supportEmail}">${supportEmail}</a>
                </p>
              </div>
            </div>
            
            <div class="footer">
              <p>This is an automated security notification from Your App.</p>
              <p>&copy; 2025 Your Company. All rights reserved.</p>
              <p>
                <a href="${supportUrl}">Support</a> | 
                <a href="https://yourapp.com/privacy">Privacy Policy</a> | 
                <a href="https://yourapp.com/terms">Terms of Service</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Hello ${userName},

✓ PASSWORD RESET SUCCESSFUL

Your account password has been reset successfully. You can now log in with your new password.

⚠️ DIDN'T MAKE THIS CHANGE?
If you did not reset your password, your account may be compromised. Please contact our support team immediately.

Recommended actions:
- Reset your password again
- Enable two-factor authentication if available
- Review your recent account activity

SECURITY TIPS:
- Never share your password with anyone
- Use a unique password for each account
- Consider using a password manager
- Enable two-factor authentication when possible

NEED HELP?
If you have any questions or concerns about your account security, contact us:

Email: ${supportEmail}
Support: ${supportUrl}

This is an automated security notification.

© 2025 Your Company. All rights reserved.`,
  };
};