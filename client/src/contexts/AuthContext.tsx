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
  loading: boolean;
  login: (
    email: string,
    password: string,
    onSuccess?: () => void,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      const adminData: Admin = JSON.parse(token);
      setAdmin(adminData);
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api-bibliotech.onrender.com/api/admins/login',
        { email, password },
      );
      const adminData: Admin = response.data;
      localStorage.setItem('adminToken', JSON.stringify(adminData));
      setAdmin(adminData);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log('Échec de la connexion', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
