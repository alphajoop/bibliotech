import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center space-y-4 bg-white p-4 font-inter text-black">
      <h1 className="font-poppins text-9xl font-bold text-blue-700">404</h1>
      <h2 className="text-2xl font-bold">Il y a eu un problème.</h2>
      <p className="text-base text-gray-700">
        Désolés, nous ne pouvons pas trouver cette page. Vous trouverez beaucoup
        à explorer sur la page d’accueil.
      </p>
      <Link
        to={'/'}
        className="transform rounded-md bg-blue-700 p-2 font-poppins font-medium text-white transition-colors duration-300 hover:bg-blue-700"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
