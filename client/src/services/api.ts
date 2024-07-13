import axios from 'axios';
import { Book, User } from '../types';

const apiUrl = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: apiUrl,
});

// Ajout d'un intercepteur pour les requêtes sortantes
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Assurez-vous que config.headers est initialisé comme un objet s'il est non défini
      config.headers = config.headers || {};
      // Ajouter le token d'authentification à l'en-tête Authorization
      config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log('Erreur 401: Non authentifié');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

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

export default api;
