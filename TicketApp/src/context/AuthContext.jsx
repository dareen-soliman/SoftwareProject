// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Set user data after login (called from Login component)
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function clears user and token
  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    // On app load, check if token exists, then fetch user profile
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
