const nodemailer = require('nodemailer');

const sendResetEmail = async (email, resetUrl) => {
  // ✅ FIX: Disable SSL certificate verification
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.EMAIL_PORT) || 2525,
    secure: false, // ✅ true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false  // ✅ BYPASS self-signed cert error
    }
  });

  const mailOptions = {
    from: `"Instagram Clone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset • Instagram Clone',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #fafafa; padding: 40px;">
        <div style="background: white; padding: 40px; border-radius: 12px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <h2 style="color: #262626; margin-bottom: 24px; font-size: 28px; font-weight: 600;">
            Reset Your Password
          </h2>
          
          <p style="color: #737373; font-size: 16px; line-height: 24px; margin-bottom: 32px;">
            You've requested to reset your Instagram Clone password. 
            Click the button below to create a new one.
          </p>
          
          <a href="${resetUrl}" 
             style="display: inline-block; background: linear-gradient(45deg, #0095f6, #007bb5); 
                    color: white; padding: 14px 36px; text-decoration: none; border-radius: 8px; 
                    font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0,149,246,0.3);">
            Reset Password
          </a>
          
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #dbdbdb;">
            <p style="color: #8e8e8e; font-size: 14px; margin: 0;">
              This link expires in <strong>10 minutes</strong>. 
              If you didn't request this, simply ignore this email.
            </p>
          </div>
          
          <hr style="margin: 40px 0; border: none; border-top: 1px solid #efefef;">
          <p style="color: #8e8e8e; font-size: 12px; margin: 0;">
            © 2025 Instagram Clone
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Reset email sent to: ${email}`);
  } catch (error) {
    console.error('❌ Email error:', error.message);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendResetEmail };
