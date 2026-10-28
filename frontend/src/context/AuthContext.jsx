import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const result = await authService.login(username, password);
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    setToken(result.token);
    setUser(result.user);
    return result;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const loginDirecto = () => {
    const mockUser = {
      id: 1,
      username: 'admin',
      full_name: 'Administrador General',
      role: 'admin'
    };
    const mockToken = 'mock-tigre-pos-jwt-token';
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setToken(mockToken);
    setUser(mockUser);
    return { token: mockToken, user: mockUser };
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, loginDirecto, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
