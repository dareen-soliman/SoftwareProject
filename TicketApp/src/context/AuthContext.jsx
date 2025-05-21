import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const { data } = await axios.post('/api/users/login', credentials);
    setUser(data.user);
  };

  const logout = async () => {
    await axios.post('/api/users/logout');
    setUser(null);
  };

  useEffect(() => {
    // Optionally fetch user info on load
    axios.get('/api/users/profile')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
