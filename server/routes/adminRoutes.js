import express from 'express';
import { authAdmin, logoutAdmin, registerAdmin } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import Admin from '../models/Admin.js';

const router = express.Router();

router.post('/login', authAdmin);
router.post('/register', protect, registerAdmin);
router.get('/check-auth', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/logout', logoutAdmin);

export default router;
