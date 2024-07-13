import User from '../models/User.js';
import sendEmail from '../utils/email.js';

export async function getUsers(req, res) {
  try {
    const users = await User.find().populate('borrowedBooks');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addUser(req, res) {
  try {
    const { name, email } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    // Créer un nouvel utilisateur
    const newUser = new User({ name, email });
    await newUser.save();

    // Envoyer un email de confirmation
    sendEmail(
      newUser.email,
      'Inscription réussie sur Bibliotech',
      `Bonjour ${newUser.name},\n\nVotre compte sur Bibliotech a été créé avec succès. Bienvenue !\n\nCordialement,`,
    );

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
