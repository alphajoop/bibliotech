import express from 'express';
import {
  addBook,
  borrowBook,
  deleteBook,
  getBooks,
  returnBook,
} from '../controllers/bookController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getBooks);
router.post('/', protect, addBook);
router.delete('/:id', protect, deleteBook);
router.post('/borrow/:bookId/:userId', protect, borrowBook);
router.post('/return/:bookId/:userId', protect, returnBook);

export default router;
