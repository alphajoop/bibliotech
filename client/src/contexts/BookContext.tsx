import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  addBook as apiAddBook,
  borrowBook as apiBorrowBook,
  deleteBook as apiDeleteBook,
  returnBook as apiReturnBook,
  getBooks,
} from '../services/api';
import { Book } from '../types';

interface BookContextProps {
  books: Book[];
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  fetchBooks: () => void;
  addBook: (
    book: Omit<Book, '_id' | 'available' | 'borrowedBy' | 'dueDate'>,
  ) => Promise<void>;
  deleteBook: (id: string) => void;
  borrowBook: (bookId: string, userId: string) => void;
  returnBook: (bookId: string, userId: string) => void;
  clearMessages: () => void;
}

interface BookProviderProps {
  children: ReactNode;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const books = await getBooks();
      setBooks(books);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Erreur lors du chargement des livres.');
      setLoading(false);
    }
  };

  const addBook = async (
    book: Omit<Book, '_id' | 'available' | 'borrowedBy' | 'dueDate'>,
  ) => {
    setLoading(true);
    try {
      const newBook = await apiAddBook(book);
      setBooks((prevBooks) => [...prevBooks, newBook]);
      setSuccessMessage('Livre ajouté avec succès.');
      setLoading(false);
    } catch (error) {
      setErrorMessage("Erreur lors de l'ajout du livre.");
      setLoading(false);
    }
  };

  const deleteBook = async (id: string) => {
    setLoading(true);
    try {
      await apiDeleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      setSuccessMessage('Livre supprimé avec succès.');
      setLoading(false);
    } catch (error) {
      setErrorMessage('Erreur lors de la suppression du livre.');
      setLoading(false);
    }
  };

  const borrowBook = async (bookId: string, userId: string) => {
    setLoading(true);
    try {
      await apiBorrowBook(bookId, userId);
      fetchBooks();
      setSuccessMessage('Livre emprunté avec succès.');
      setLoading(false);
    } catch (error) {
      setErrorMessage("Erreur lors de l'emprunt du livre.");
      setLoading(false);
    }
  };

  const returnBook = async (bookId: string, userId: string) => {
    setLoading(true);
    try {
      await apiReturnBook(bookId, userId);
      fetchBooks();
      setSuccessMessage('Livre retourné avec succès.');
      setLoading(false);
    } catch (error) {
      setErrorMessage('Erreur lors du retour du livre.');
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        successMessage,
        errorMessage,
        fetchBooks,
        addBook,
        deleteBook,
        borrowBook,
        returnBook,
        clearMessages,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
