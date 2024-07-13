import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Configuration CORS
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

// Middleware pour le traitement des données JSON et URL encodées
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connexion à la base de données
connectDB();

// Utilisation des routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
