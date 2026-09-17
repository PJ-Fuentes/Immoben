import { Github, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Immoben</h3>
            <p className="text-gray-600 text-sm">
              Portail de suivi des pannes locatives pour une gestion efficace de la maintenance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-primary-600 transition">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/new" className="text-gray-600 hover:text-primary-600 transition">
                  Signaler une panne
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">À propos</h3>
            <p className="text-gray-600 text-sm mb-3">
              Un projet open source pour faciliter la communication entre locataires et propriétaires.
            </p>
            <a
              href="https://github.com/PJ-Fuentes/Immoben"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">Voir sur GitHub</span>
            </a>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <span>© {currentYear} Immoben. Fait avec</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>pour améliorer la gestion locative.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
