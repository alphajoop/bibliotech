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
  fetchBooks: () => void;
  addBook: (
    book: Omit<Book, '_id' | 'available' | 'borrowedBy' | 'dueDate'>,
  ) => Promise<void>;
  deleteBook: (id: string) => void;
  borrowBook: (bookId: string, userId: string) => void;
  returnBook: (bookId: string, userId: string) => void;
}

interface BookProviderProps {
  children: ReactNode;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBooks = async () => {
    setLoading(true);
    const books = await getBooks();
    setBooks(books);
    setLoading(false);
  };

  const addBook = async (
    book: Omit<Book, '_id' | 'available' | 'borrowedBy' | 'dueDate'>,
  ) => {
    setLoading(true);
    const newBook = await apiAddBook(book);
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setLoading(false);
  };

  const deleteBook = async (id: string) => {
    setLoading(true);
    await apiDeleteBook(id);
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    setLoading(false);
  };

  const borrowBook = async (bookId: string, userId: string) => {
    setLoading(true);
    await apiBorrowBook(bookId, userId);
    fetchBooks();
    setLoading(false);
  };

  const returnBook = async (bookId: string, userId: string) => {
    setLoading(true);
    await apiReturnBook(bookId, userId);
    fetchBooks();
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        fetchBooks,
        addBook,
        deleteBook,
        borrowBook,
        returnBook,
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
