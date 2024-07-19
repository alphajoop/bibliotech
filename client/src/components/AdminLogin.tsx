import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/bibliotech.svg';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';
import { useUsers } from '../contexts/UserContext';
import Loading from './Loading';

export default function AdminLogin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { login, admin, loading } = useAuth();
  const { fetchBooks } = useBooks();
  const { fetchUsers } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      navigate('/');
    }
  }, [admin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, () => {
        fetchBooks();
        fetchUsers();
      });
      setError('Email ou mot de passe incorrect');
    } catch (err) {
      setError('Échec de la connexion');
    }
  };

  return (
    <section className="bg-gray-50 font-inter">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to={'/'}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img className="w-16 h-16 mr-2" src={Logo} alt="logo" />
          Bibliotech
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Connexion Administrateur
            </h1>
            {error && (
              <div className="mb-4 text-base text-red-600">{error}</div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  aria-label="Email de admin"
                  placeholder="nom@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Mot de passe
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  aria-label="Password de admin"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
              >
                {loading ? <Loading info="Chargement..." /> : 'Connexion'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
