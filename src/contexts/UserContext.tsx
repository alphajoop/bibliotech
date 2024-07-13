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
  fetchUsers: () => void;
  addUser: (user: Omit<User, '_id' | 'borrowedBooks'>) => Promise<void>;

  deleteUser: (id: string) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const addUser = async (user: Omit<User, '_id' | 'borrowedBooks'>) => {
    const newUser = await apiAddUser(user);
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const deleteUser = async (id: string) => {
    await apiDeleteUser(id);
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, fetchUsers, addUser, deleteUser }}>
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
