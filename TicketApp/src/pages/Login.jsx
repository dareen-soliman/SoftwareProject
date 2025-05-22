import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post('/v1/login', { email, password });
      // Assuming backend sends token in res.data.token
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);

        // Decode token to get user role (assuming JWT)
        const decoded = parseJwt(token);
        if (decoded && decoded.role) {
          localStorage.setItem("role", decoded.role);
        } else {
          // fallback role if role not in token
          localStorage.setItem("role", "standard");
        }

        // Redirect to dashboard page
        navigate("/dashboard");
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      setError("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <p>
          Forgot your password? <a href="/forgot-password">Reset it here</a>
        </p>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}

export default Login;
