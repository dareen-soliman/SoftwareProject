import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await api.post("/v1/forgetPassword", { email });
      setMessage(res.data.message || "Check your email for OTP.");
      setOtpSent(true);
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong.");
    }
  };

  // Step 2: Verify OTP + Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await api.post("/v1/verifyOTP", { email, otp, newPassword });
      setMessage(res.data.message || "Password reset successfully!");
      // Redirect after short delay to login or home
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("OTP verification/reset error:", err);
      setError(err.response?.data?.message || err.message || "OTP verification or reset failed.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      {!otpSent ? (
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          /><br />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          /><br />
          <button type="submit">Reset Password</button>
        </form>
      )}

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ForgotPassword;
