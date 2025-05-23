// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

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
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post('/v1/login', { email, password });
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);

        const decoded = parseJwt(token);
        const role = decoded?.role || "standard";

        localStorage.setItem("role", role);
        login({ ...decoded, role }); // Set user in AuthContext

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
        <p>
            Don't have an account? <a href="/register">Register here</a>
        </p>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
