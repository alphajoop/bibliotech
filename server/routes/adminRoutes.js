import express from 'express';
import { authAdmin, registerAdmin } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authAdmin);
router.post('/register', protect, registerAdmin);

export default router;
