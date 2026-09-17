import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import PropertyLinkButton from '../PropertyLinkButton'

export const dynamic = 'force-dynamic'

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      tenants: true,
      tickets: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  })

  if (!property) {
    notFound()
  }

  async function deleteProperty() {
    'use server'
    await prisma.property.delete({ where: { id: params.id } })
    redirect('/manager/properties')
  }

  return (
    <div>
      <Link
        href="/manager/properties"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux biens
      </Link>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {property.address}
            </h1>
            <p className="text-gray-600">
              {property.postalCode} {property.city}
            </p>
            {property.reference && (
              <p className="text-sm text-gray-500 mt-1">Réf: {property.reference}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/manager/properties/${property.id}/edit`}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-5 h-5" />
            </Link>
            <form action={deleteProperty}>
              <button
                type="submit"
                onClick={(e) => {
                  if (!confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
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

        <div className="border-t pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Lien de déclaration de panne
          </h3>
          <PropertyLinkButton propertyToken={property.token} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Locataires ({property.tenants.length})
          </h2>
          {property.tenants.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucun locataire assigné</p>
          ) : (
            <div className="space-y-3">
              {property.tenants.map((tenant) => (
                <Link
                  key={tenant.id}
                  href={`/manager/tenants/${tenant.id}`}
                  className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">
                    {tenant.firstName} {tenant.lastName}
                  </p>
                  {tenant.phone && (
                    <p className="text-sm text-gray-600">{tenant.phone}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Demandes récentes
          </h2>
          {property.tickets.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune demande</p>
          ) : (
            <div className="space-y-3">
              {property.tickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/manager/tickets/${ticket.id}`}
                  className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">{ticket.type}</p>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {ticket.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
