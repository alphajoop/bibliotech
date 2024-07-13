import Book from '../models/Book.js';
import User from '../models/User.js';
import sendEmail from '../utils/email.js';

export async function getBooks(req, res) {
  const books = await Book.find().populate('borrowedBy');
  res.json(books);
}

export async function addBook(req, res) {
  const newBook = new Book(req.body);
  await newBook.save();
  res.status(201).json(newBook);
}

export async function deleteBook(req, res) {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).send();
}

export async function borrowBook(req, res) {
  const { bookId, userId } = req.params;
  const book = await Book.findById(bookId);
  const user = await User.findById(userId);

  if (book.available) {
    book.available = false;
    book.borrowedBy = user._id;
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // Emprunt de 2 semaines

    user.borrowedBooks.push(book._id);

    await book.save();
    await user.save();

    // Envoyer une notification par email à l'utilisateur
    sendEmail(
      user.email,
      'Emprunt de livre confirmé - Bibliotech',
      `Bonjour ${user.name},\n\nVous avez emprunté le livre "${book.title}" sur Bibliotech. Veuillez le retourner avant le ${book.dueDate.toLocaleDateString()}.\n\nMerci,`,
    );

    res.status(200).json({ message: 'Livre emprunté avec succès' });
  } else {
    res.status(400).json({ message: 'Livre déjà emprunté' });
  }
}

export async function returnBook(req, res) {
  const { bookId, userId } = req.params;
  const book = await Book.findById(bookId);
  const user = await User.findById(userId);

  if (book.borrowedBy && book.borrowedBy.toString() === user._id.toString()) {
    book.available = true;
    book.borrowedBy = null;
    book.dueDate = null;

    user.borrowedBooks = user.borrowedBooks.filter(
      (id) => id.toString() !== book._id.toString(),
    );

    await book.save();
    await user.save();

    // Envoyer une notification par email à l'utilisateur
    sendEmail(
      user.email,
      'Retour de livre confirmé - Bibliotech',
      `Bonjour ${user.name},\n\nVous avez retourné le livre "${book.title}" sur Bibliotech. Merci pour votre retour.\n\nCordialement,`,
    );

    res.status(200).json({ message: 'Livre retourné avec succès' });
  } else {
    res
      .status(400)
      .json({ message: "Ce livre n'a pas été emprunté par cet utilisateur" });
  }
}
