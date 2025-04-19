const nodemailer = require('nodemailer');

async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Your email (used for sending)
      pass: process.env.EMAIL_PASS,  // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender's email (your email)
    to: email,                    // Recipient's email (user's email)
    subject: 'Your OTP for Password Reset',
    text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP');
  }
}

module.exports = sendOTPEmail;
