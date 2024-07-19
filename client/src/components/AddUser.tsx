import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../contexts/UserContext';
import { useSubmitForm } from '../hooks/useSubmitForm';
import Loading from './Loading';

interface UserForm {
  name: string;
  email: string;
  createdAt: string;
}

export default function AddUser() {
  const { addUser } = useUsers();
  const { isLoading, successMessage, errorMessage, handleSubmit } =
    useSubmitForm<UserForm>(addUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { admin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate('/login');
    }
  }, [admin, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(
      {
        name,
        email,
        createdAt: '',
      },
      'Utilisateur ajouté avec succès',
      "Erreur lors de l'ajout de l'utilisateur",
    );
    setName('');
    setEmail('');
  };

  return (
    <section className="bg-white font-inter">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Ajouter un utilisateur
        </h2>
        {successMessage && (
          <div className="mb-4 text-base text-green-600">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mb-4 text-base text-red-600">{errorMessage}</div>
        )}
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nom
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Nom de l'utilisateur"
                placeholder="Nom de l'utilisateur"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email de l'utilisateur"
                placeholder="Email de l'utilisateur"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            disabled={isLoading}
          >
            {isLoading ? <Loading info="Chargement..." /> : 'Ajouter'}
          </button>
        </form>
      </div>
    </section>
  );
}
