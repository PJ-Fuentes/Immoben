import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { ArrowLeft, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function TenantDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const tenant = await prisma.tenant.findUnique({
    where: { id: params.id },
    include: {
      property: true,
      tickets: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!tenant) {
    notFound()
  }

  async function deleteTenant() {
    'use server'
    await prisma.tenant.delete({ where: { id: params.id } })
    redirect('/manager/tenants')
  }

  return (
    <div>
      <Link
        href="/manager/tenants"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux locataires
      </Link>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {tenant.firstName} {tenant.lastName}
            </h1>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{tenant.property.address}, {tenant.property.postalCode} {tenant.property.city}</span>
              </div>
              {tenant.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href={`tel:${tenant.phone}`} className="text-blue-600 hover:underline">
                    {tenant.phone}
                  </a>
                </div>
              )}
              {tenant.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href={`mailto:${tenant.email}`} className="text-blue-600 hover:underline">
                    {tenant.email}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/manager/tenants/${tenant.id}/edit`}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-5 h-5" />
            </Link>
            <form action={deleteTenant}>
              <button
                type="submit"
                onClick={(e) => {
                  if (!confirm('Êtes-vous sûr de vouloir supprimer ce locataire ?')) {
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
          Demandes ({tenant.tickets.length})
        </h2>
        {tenant.tickets.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucune demande</p>
        ) : (
          <div className="space-y-3">
            {tenant.tickets.map((ticket) => (
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
                <p className="text-sm text-gray-600 line-clamp-2">
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
