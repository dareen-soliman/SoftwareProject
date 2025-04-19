const crypto = require('crypto');

function generateOTP() {
  const otp = crypto.randomBytes(3).toString('hex'); // Generates a 6-character OTP
  const expires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  return { otp, expires };
}

module.exports = generateOTP;
