import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { ArrowLeft, Edit, Trash2, Phone, Mail, Star } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ArtisanDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const artisan = await prisma.artisan.findUnique({
    where: { id: params.id },
    include: {
      tickets: {
        include: {
          property: true,
          tenant: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!artisan) {
    notFound()
  }

  async function deleteArtisan() {
    'use server'
    await prisma.artisan.delete({ where: { id: params.id } })
    redirect('/manager/artisans')
  }

  return (
    <div>
      <Link
        href="/manager/artisans"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux artisans
      </Link>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {artisan.name}
              </h1>
              {artisan.isDefault && (
                <span className="flex items-center text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 mr-1" />
                  Par défaut
                </span>
              )}
            </div>
            {artisan.specialty && (
              <p className="text-lg text-gray-600 mb-4">{artisan.specialty}</p>
            )}
            <div className="space-y-2 text-gray-600">
              {artisan.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href={`tel:${artisan.phone}`} className="text-blue-600 hover:underline">
                    {artisan.phone}
                  </a>
                </div>
              )}
              {artisan.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href={`mailto:${artisan.email}`} className="text-blue-600 hover:underline">
                    {artisan.email}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/manager/artisans/${artisan.id}/edit`}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-5 h-5" />
            </Link>
            <form action={deleteArtisan}>
              <button
                type="submit"
                onClick={(e) => {
                  if (!confirm('Êtes-vous sûr de vouloir supprimer cet artisan ?')) {
                    e.preventDefault()
                  }
                }}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Interventions ({artisan.tickets.length})
        </h2>
        {artisan.tickets.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucune intervention</p>
        ) : (
          <div className="space-y-3">
            {artisan.tickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/manager/tickets/${ticket.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{ticket.type}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString('fr-BE')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  📍 {ticket.property.address}
                </p>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {ticket.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
