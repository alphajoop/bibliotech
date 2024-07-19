import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { login as apiLogin, logout as apiLogout } from '../services/api';

interface Admin {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextProps {
  admin: Admin | null;
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  login: (
    email: string,
    password: string,
    onSuccess?: () => void,
  ) => Promise<void>;
  logout: () => void;
  clearMessages: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      const adminData: Admin = await apiLogin(email, password);
      localStorage.setItem('adminToken', JSON.stringify(adminData));
      setAdmin(adminData);
      setSuccessMessage('Connexion réussie.');
      if (onSuccess) onSuccess();
    } catch (error) {
      setErrorMessage('Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    apiLogout();
    setSuccessMessage('Déconnexion réussie.');
  };

  const clearMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        successMessage,
        errorMessage,
        login,
        logout,
        clearMessages,
      }}
    >
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
