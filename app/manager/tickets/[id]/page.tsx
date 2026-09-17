import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { TICKET_TYPES, TICKET_URGENCY, TICKET_STATUS } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import TicketActions from './TicketActions'
import { ArrowLeft, MapPin, User, Phone, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function TicketDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
    include: {
      property: true,
      tenant: true,
      artisan: true,
      photos: true,
      timeline: {
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!ticket) {
    notFound()
  }

  const artisans = await prisma.artisan.findMany({
    where: { agencyId: ticket.agencyId },
    orderBy: { isDefault: 'desc' },
  })

  const isEanRequest = ticket.type === 'code_ean'

  return (
    <div>
      <Link
        href="/manager"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux demandes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {TICKET_TYPES[ticket.type as keyof typeof TICKET_TYPES]}
                </h1>
                <div className="flex items-center space-x-3">
                  <StatusBadge status={ticket.status} />
                  <UrgencyBadge urgency={ticket.urgency} />
                  {isEanRequest && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                      📋 Demande administrative
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Description</h3>
                <p className="text-gray-900">{ticket.description}</p>
              </div>

              {ticket.photos.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {ticket.photos.map((photo) => (
                      <a
                        key={photo.id}
                        href={`/uploads/${ticket.id}/${photo.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={`/uploads/${ticket.id}/${photo.filename}`}
                          alt="Photo de la panne"
                          className="w-full h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
            <TicketActions
              ticket={ticket}
              artisans={artisans}
              isEanRequest={isEanRequest}
            />
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Historique</h2>
            <div className="space-y-4">
              {ticket.timeline.map((event, index) => (
                <div key={event.id} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    {index < ticket.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-300 mt-2" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-gray-900">
                      {TICKET_STATUS[event.status as keyof typeof TICKET_STATUS]}
                    </p>
                    {event.note && (
                      <p className="text-sm text-gray-600 mt-1">{event.note}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(event.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Property info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Bien</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-gray-900">{ticket.property.address}</p>
                  <p className="text-gray-600">
                    {ticket.property.postalCode} {ticket.property.city}
                  </p>
                </div>
              </div>
              {ticket.property.reference && (
                <p className="text-gray-600">Réf: {ticket.property.reference}</p>
              )}
            </div>
          </div>

          {/* Tenant info */}
          {ticket.tenant && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Locataire</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <p className="text-gray-900">
                    {ticket.tenant.firstName} {ticket.tenant.lastName}
                  </p>
                </div>
                {ticket.tenant.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <a href={`tel:${ticket.tenant.phone}`} className="text-blue-600 hover:underline">
                      {ticket.tenant.phone}
                    </a>
                  </div>
                )}
                {ticket.tenant.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <a href={`mailto:${ticket.tenant.email}`} className="text-blue-600 hover:underline">
                      {ticket.tenant.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Artisan info */}
          {ticket.artisan && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Artisan assigné</h3>
              <div className="space-y-3 text-sm">
                <p className="font-medium text-gray-900">{ticket.artisan.name}</p>
                {ticket.artisan.specialty && (
                  <p className="text-gray-600">{ticket.artisan.specialty}</p>
                )}
                {ticket.artisan.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <a href={`tel:${ticket.artisan.phone}`} className="text-blue-600 hover:underline">
                      {ticket.artisan.phone}
                    </a>
                  </div>
                )}
                {ticket.artisan.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <a href={`mailto:${ticket.artisan.email}`} className="text-blue-600 hover:underline">
                      {ticket.artisan.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Informations</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Créé le</p>
                <p className="text-gray-900">{formatDate(ticket.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-600">Dernière mise à jour</p>
                <p className="text-gray-900">{formatDate(ticket.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    nouveau: 'bg-red-100 text-red-700',
    valide: 'bg-blue-100 text-blue-700',
    envoye: 'bg-purple-100 text-purple-700',
    en_cours: 'bg-yellow-100 text-yellow-700',
    resolu: 'bg-green-100 text-green-700',
  }

  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {TICKET_STATUS[status as keyof typeof TICKET_STATUS] || status}
    </span>
  )
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  const colors: Record<string, string> = {
    basse: 'bg-gray-100 text-gray-700',
    moyenne: 'bg-orange-100 text-orange-700',
    haute: 'bg-red-100 text-red-700',
  }

  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${colors[urgency] || 'bg-gray-100 text-gray-700'}`}>
      {TICKET_URGENCY[urgency as keyof typeof TICKET_URGENCY] || urgency}
    </span>
  )
}
