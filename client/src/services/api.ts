import axios from 'axios';
import { Book, User } from '../types';

const apiUrl = 'https://api-bibliotech.onrender.com/api';

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get('/books');
  return response.data;
};

export const addBook = async (
  book: Omit<Book, '_id' | 'available' | 'borrowedBy' | 'dueDate'>,
): Promise<Book> => {
  const response = await api.post('/books', book);
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`/books/${id}`);
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const addUser = async (
  user: Omit<User, '_id' | 'borrowedBooks'>,
): Promise<User> => {
  const response = await api.post('/users', user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const borrowBook = async (
  bookId: string,
  userId: string,
): Promise<void> => {
  await api.post(`/books/borrow/${bookId}/${userId}`);
};

export const returnBook = async (
  bookId: string,
  userId: string,
): Promise<void> => {
  await api.post(`/books/return/${bookId}/${userId}`);
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getCurrentAdmin = async () => {
  const response = await api.get('/auth/check-auth');
  return response.data;
};

export const logout = async () => {
  // Effacer le cookie côté serveur
  await api.post('/auth/logout');
};

export default api;
