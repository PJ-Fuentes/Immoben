import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <Home className="w-20 h-20 text-primary-600 mx-auto" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Panne non trouvée
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          La panne que vous recherchez n&apos;existe pas ou a été supprimée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-medium"
        >
          <Home className="w-5 h-5" />
          <span>Retour à la liste des pannes</span>
        </Link>
      </div>
    </div>
  );
}
