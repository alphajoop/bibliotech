import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';
import { useSubmitForm } from '../hooks/useSubmitForm';
import Loading from './Loading';

interface Book {
  title: string;
  author: string;
  year: number;
  genre: string;
}

export default function AddBook() {
  const { addBook } = useBooks();
  const { isLoading, successMessage, errorMessage, handleSubmit } =
    useSubmitForm<Book>(addBook);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

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
      { title, author, year: parseInt(year), genre },
      'Livre ajouté avec succès',
      "Erreur lors de l'ajout du livre",
    );
    setTitle('');
    setAuthor('');
    setYear('');
    setGenre('');
  };

  return (
    <section className="bg-white font-inter">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Ajouter un livre
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
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Titre
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-label="Titre du livre"
                placeholder="Titre du livre"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Auteur
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                aria-label="Auteur du livre"
                placeholder="Auteur du livre"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Année
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                aria-label="Année de publication du livre"
                placeholder="Année de publication du livre"
                required
                pattern="[0-9]{4}"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Genre
              </label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                aria-label="Genre du livre"
                placeholder="Genre du livre"
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
