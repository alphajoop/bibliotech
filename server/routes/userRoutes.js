import express from 'express';
import {
  addUser,
  deleteUser,
  getUsers,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUsers);
router.post('/', protect, addUser);
router.delete('/:id', protect, deleteUser);

export default router;
