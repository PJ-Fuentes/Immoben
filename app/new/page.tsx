'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryIcon from '@/components/CategoryIcon';
import { IssueCategory, IssuePriority } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewIssuePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'plumbing' as IssueCategory,
    priority: 'medium' as IssuePriority,
    tenantName: '',
    propertyAddress: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  const categories: { value: IssueCategory; label: string }[] = [
    { value: 'plumbing', label: 'Plomberie' },
    { value: 'electrical', label: 'Électricité' },
    { value: 'heating', label: 'Chauffage' },
    { value: 'appliances', label: 'Électroménager' },
    { value: 'structure', label: 'Structure' },
    { value: 'security', label: 'Sécurité' },
    { value: 'other', label: 'Autre' },
  ];

  const priorities: { value: IssuePriority; label: string }[] = [
    { value: 'low', label: 'Basse' },
    { value: 'medium', label: 'Moyenne' },
    { value: 'high', label: 'Haute' },
    { value: 'urgent', label: 'Urgente' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la liste</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Signaler une panne</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700 mb-2">
                Votre nom
              </label>
              <input
                type="text"
                id="tenantName"
                required
                value={formData.tenantName}
                onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Jean Dupont"
              />
            </div>

            <div>
              <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse du bien
              </label>
              <input
                type="text"
                id="propertyAddress"
                required
                value={formData.propertyAddress}
                onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="15 Rue de la Paix, 75002 Paris"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la panne
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: Fuite d'eau dans la salle de bain"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description détaillée
              </label>
              <textarea
                id="description"
                required
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Décrivez le problème en détail..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as IssueCategory })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priorité
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as IssuePriority })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {priorities.map((pri) => (
                    <option key={pri.value} value={pri.value}>
                      {pri.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Annuler
              </Link>
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
              >
                Signaler la panne
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
