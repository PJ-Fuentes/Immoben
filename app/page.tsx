import Link from 'next/link'
import { Building2, User, Wrench } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-4">
          Immoben
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Plateforme de suivi des pannes locatives
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/manager"
            className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Espace Gestionnaire
              </h2>
              <p className="text-gray-600">
                Gérez vos biens, locataires et demandes de pannes
              </p>
            </div>
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Espace Locataire
              </h2>
              <p className="text-gray-600 mb-4">
                Utilisez le lien unique reçu de votre gestionnaire
              </p>
              <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                <code className="text-xs">
                  /demande/[votre-token]
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
          <div className="flex items-start space-x-3">
            <Wrench className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment ça marche ?
              </h3>
              <ol className="text-sm text-gray-600 space-y-2">
                <li>1. Le gestionnaire crée un lien unique par logement</li>
                <li>2. Le locataire reçoit le lien et déclare sa panne (avec photos)</li>
                <li>3. Le gestionnaire valide et envoie à l'artisan</li>
                <li>4. Suivi du statut jusqu'à résolution</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
