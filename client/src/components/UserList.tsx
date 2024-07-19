import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Search,
  Trash,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../contexts/UserContext';

interface RadioProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Radio = ({ checked, onChange, label }: RadioProps) => (
  <div className="flex items-center">
    <input
      type="radio"
      checked={checked}
      onChange={onChange}
      id={`${label}`}
      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 focus:ring-2"
    />
    <label
      htmlFor={`${label}`}
      className="ml-2 text-sm font-medium text-gray-900"
    >
      {label}
    </label>
  </div>
);

export default function UserList() {
  const { users, deleteUser, loading } = useUsers();

  const { admin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate('/login');
    }
  }, [admin, navigate]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [sortOrder, setSortOrder] = useState<string>('');
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === 'A-Z') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'Z-A') {
        return b.name.localeCompare(a.name);
      } else if (sortOrder === 'Plus récent') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortOrder === 'Plus ancien') {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
    //setShowFilterDropdown(false);
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  return (
    <section className="bg-white border-gray-200 font-inter">
      <div className="max-w-screen-xl mx-auto p-4">
        <h2 className="mb-4 text-xl font-poppins font-bold text-gray-900">
          Liste des utilisateurs
        </h2>
        <div className="overflow-x-auto bg-white relative shadow-md sm:rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="text-gray-300" />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                    placeholder="Recherche"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Link
                to={'/add-user'}
                className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
              >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter un utilisateur
              </Link>
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-200"
                  type="button"
                >
                  <Filter className="h-5 w-5 mr-2 text-gray-400" />
                  Filter
                  <ChevronDown className="-mr-1 ml-1.5 w-4 h-4" />
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 z-10 w-48 p-3 mt-2 bg-white rounded-lg shadow">
                    <h6 className="mb-3 text-sm font-medium text-gray-900">
                      Filtrer par
                    </h6>
                    <Radio
                      checked={sortOrder === ''}
                      onChange={() => handleSortOrderChange('')}
                      label="Tous les utilisateurs"
                    />
                    <Radio
                      checked={sortOrder === 'A-Z'}
                      onChange={() => handleSortOrderChange('A-Z')}
                      label="A-Z"
                    />
                    <Radio
                      checked={sortOrder === 'Z-A'}
                      onChange={() => handleSortOrderChange('Z-A')}
                      label="Z-A"
                    />
                    <Radio
                      checked={sortOrder === 'Plus récent'}
                      onChange={() => handleSortOrderChange('Plus récent')}
                      label="Plus récent"
                    />
                    <Radio
                      checked={sortOrder === 'Plus ancien'}
                      onChange={() => handleSortOrderChange('Plus ancien')}
                      label="Plus ancien"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {loading ? (
            <p className="p-4 text-center text-gray-500">
              Chargement des utilisateurs...
            </p>
          ) : filteredUsers.length === 0 ? (
            <p className="p-4 text-center text-gray-500">
              Aucun utilisateur trouvé.
            </p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => deleteUser(user._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Supprimer"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500">
              Affichage de
              <span className="font-semibold text-gray-900">
                {currentPage * usersPerPage - usersPerPage + 1}
              </span>
              à
              <span className="font-semibold text-gray-900">
                {Math.min(currentPage * usersPerPage, filteredUsers.length)}
              </span>
              sur
              <span className="font-semibold text-gray-900">
                {filteredUsers.length}
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="sr-only">Précédent</span>
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                      currentPage === index + 1
                        ? 'text-blue-600 bg-blue-50 border-blue-300'
                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="sr-only">Suivant</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
