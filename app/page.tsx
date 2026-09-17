'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IssueCard from '@/components/IssueCard';
import Stats from '@/components/Stats';
import SearchBar from '@/components/SearchBar';
import { mockIssues } from '@/lib/mockData';
import { Issue, IssueStatus } from '@/types';
import { Filter, ArrowUpDown } from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'priority';

export default function Home() {
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredAndSortedIssues = useMemo(() => {
    let filtered = mockIssues.filter(issue => {
      const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
      const matchesSearch = searchQuery === '' || 
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });

    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };

    return filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });
  }, [statusFilter, searchQuery, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Suivi des pannes
          </h2>
          <p className="text-gray-600">
            Gérez et suivez toutes vos demandes de maintenance
          </p>
        </div>

        <Stats issues={mockIssues} />

        <div className="mb-6">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Rechercher une panne par titre, description, locataire ou adresse..."
          />
        </div>

        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtrer par statut:</span>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Trier par:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">Plus récentes</option>
              <option value="oldest">Plus anciennes</option>
              <option value="priority">Priorité</option>
            </select>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtrer par statut:</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                statusFilter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                statusFilter === 'pending'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              En attente
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                statusFilter === 'in_progress'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              En cours
            </button>
            <button
              onClick={() => setStatusFilter('resolved')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                statusFilter === 'resolved'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Résolues
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredAndSortedIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>

        {filteredAndSortedIssues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune panne trouvée avec ce filtre.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
