// src/components/Breadcrumbs.tsx
import { House } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    'book-list': 'Livres',
    'add-book': 'Ajouter Livre',
    'user-list': 'Utilisateurs',
    'add-user': 'Ajouter Utilisateur',
  };

  const getBreadcrumbs = () => {
    const breadcrumbs: { to: string; label: string }[] = [];
    pathnames.forEach((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      breadcrumbs.push({ to, label: breadcrumbNameMap[value] || value });
    });

    // Ajouter des chemins parents spécifiques
    if (
      location.pathname.includes('add-book') &&
      !location.pathname.includes('book-list')
    ) {
      breadcrumbs.unshift({ to: '/book-list', label: 'Livres' });
    } else if (
      location.pathname.includes('add-user') &&
      !location.pathname.includes('user-list')
    ) {
      breadcrumbs.unshift({ to: '/user-list', label: 'Utilisateurs' });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="bg-white flex max-w-screen-xl items-center mx-auto px-4 py-3 text-gray-700 font-inter">
      <ol className="inline-flex items-center">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600"
          >
            <House className="w-5 h-5 me-1" />
            Accueil
          </Link>
          <span className="mx-2">/</span>
        </li>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={breadcrumb.to}
              className={`inline-flex items-center text-base font-medium text-gray-700 ${isLast ? 'text-sm font-medium text-gray-500' : ''}`}
            >
              {!isLast ? (
                <Link
                  to={breadcrumb.to}
                  className="text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
              {!isLast && <span className="mx-2">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
