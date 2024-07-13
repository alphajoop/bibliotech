export interface Book {
  _id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  available: boolean;
  borrowedBy?: User;
  dueDate?: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  borrowedBooks: Book[];
}
