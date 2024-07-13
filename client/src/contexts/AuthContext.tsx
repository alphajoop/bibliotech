import axios from 'axios';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Admin {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextProps {
  admin: Admin | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      const adminData: Admin = JSON.parse(token);
      setAdmin(adminData);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/admins/login',
        { email, password },
      );
      const adminData: Admin = response.data;
      localStorage.setItem('adminToken', JSON.stringify(adminData));
      setAdmin(adminData);
    } catch (error) {
      console.log('Échec de la connexion', error);
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
