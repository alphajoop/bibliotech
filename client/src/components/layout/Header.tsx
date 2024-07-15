import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/bibliotech.svg';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const navLinks = [
    { text: 'Livres', url: '/book-list' },
    { text: 'Ajouter Livre', url: '/add-book' },
    { text: 'Utilisateurs', url: '/user-list' },
    { text: 'Ajouter Utilisateur', url: '/add-user' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('overflow-hidden');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-gray-200 font-inter">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={''}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-12" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Bibliotech
          </span>
        </Link>
        {admin && (
          <>
            <button
              onClick={handleMenuToggle}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Menu />
            </button>
            <div
              className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                {navLinks.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.url}
                      className={`
                    block rounded px-3 py-2 font-poppins text-xs font-semibold transition-all duration-500 md:p-0 md:text-lg md:hover:bg-transparent
                    ${location.pathname === `${link.url}` ? 'bg-blue-700 text-white hover:bg-blue-700 md:bg-transparent md:text-blue-700' : 'text-gray-900 hover:bg-gray-100 md:hover:text-blue-700'}
                  `}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}

                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block rounded px-3 py-2 font-poppins text-xs font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-100 md:p-0 md:text-lg md:hover:bg-transparent md:hover:text-blue-700"
                  >
                    Déconnexion
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
