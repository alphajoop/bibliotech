import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  addUser as apiAddUser,
  deleteUser as apiDeleteUser,
  getUsers,
} from '../services/api';
import { User } from '../types';

interface UserContextProps {
  users: User[];
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  fetchUsers: () => void;
  addUser: (user: Omit<User, '_id' | 'borrowedBooks'>) => Promise<void>;
  deleteUser: (id: string) => void;
  clearMessages: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await getUsers();
      setUsers(users);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Erreur lors du chargement des utilisateurs.');
      setLoading(false);
    }
  };

  const addUser = async (user: Omit<User, '_id' | 'borrowedBooks'>) => {
    setLoading(true);
    try {
      const newUser = await apiAddUser(user);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setSuccessMessage('Utilisateur ajouté avec succès.');
      setLoading(false);
    } catch (error) {
      setErrorMessage("Erreur lors de l'ajout de l'utilisateur.");
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      await apiDeleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setSuccessMessage('Utilisateur supprimé avec succès.');
      setLoading(false);
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression de l'utilisateur.");
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        successMessage,
        errorMessage,
        fetchUsers,
        addUser,
        deleteUser,
        clearMessages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
