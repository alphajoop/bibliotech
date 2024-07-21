import jwt from 'jsonwebtoken';

// Generate JWT
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60 * 1000, // 24 heures
  });
};
