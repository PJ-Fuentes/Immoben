import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Immoben</h1>
              <p className="text-xs text-gray-500">Suivi des pannes locatives</p>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Toutes les pannes
            </Link>
            <Link 
              href="/new" 
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
            >
              Signaler une panne
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
