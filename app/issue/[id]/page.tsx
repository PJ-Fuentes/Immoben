'use client';

import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatusBadge from '@/components/StatusBadge';
import PriorityBadge from '@/components/PriorityBadge';
import CategoryIcon from '@/components/CategoryIcon';
import { mockIssues } from '@/lib/mockData';
import { Calendar, MapPin, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function IssuePage({ params }: { params: { id: string } }) {
  const issue = mockIssues.find(i => i.id === params.id);
  const [newComment, setNewComment] = useState('');

  if (!issue) {
    notFound();
  }

  const formattedCreatedDate = new Date(issue.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedUpdatedDate = new Date(issue.updatedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    setNewComment('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la liste</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-50 rounded-lg">
                <CategoryIcon category={issue.category} className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{issue.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{issue.tenantName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{issue.propertyAddress}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <StatusBadge status={issue.status} />
              <PriorityBadge priority={issue.priority} />
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{issue.description}</p>
          </div>

          <div className="border-t pt-6 mt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Créé le:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 font-medium">{formattedCreatedDate}</span>
                </div>
              </div>
              <div>
                <span className="text-gray-500">Dernière mise à jour:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 font-medium">{formattedUpdatedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Commentaires ({issue.comments.length})
          </h2>

          <div className="space-y-4 mb-6">
            {issue.comments.map((comment) => {
              const commentDate = new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div 
                  key={comment.id} 
                  className={`p-4 rounded-lg ${
                    comment.isLandlord 
                      ? 'bg-blue-50 border-l-4 border-blue-500' 
                      : 'bg-gray-50 border-l-4 border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{comment.author}</span>
                      {comment.isLandlord && (
                        <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                          Propriétaire
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{commentDate}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              );
            })}

            {issue.comments.length === 0 && (
              <p className="text-gray-500 text-center py-8">Aucun commentaire pour le moment.</p>
            )}
          </div>

          <form onSubmit={handleSubmitComment} className="border-t pt-6">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Ajouter un commentaire
            </label>
            <textarea
              id="comment"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Écrivez votre commentaire ici..."
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                Publier le commentaire
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
