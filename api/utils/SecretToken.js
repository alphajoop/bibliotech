import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

// Generate JWT
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
