import Admin from '../models/Admin.js';
import { generateToken } from '../utils/SecretToken.js';

export async function registerAdmin(req, res) {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: 'Cet administrateur existe déjà.' });
  }

  const admin = await Admin.create({ name, email, password });

  if (admin) {
    const token = generateToken(admin._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 heures
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400).json({ message: 'Invalid admin data' });
  }
}


export async function authAdmin(req, res) {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    const token = generateToken(admin._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 heures
    });

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
}

export async function logoutAdmin(req, res) {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
  });
  res.status(200).json({ message: 'Logout successful' });
}