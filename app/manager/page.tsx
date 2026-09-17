import Link from 'next/link'
import { prisma } from '@/lib/db'
import { TICKET_TYPES, TICKET_URGENCY, TICKET_STATUS } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ManagerDashboard() {
  // Get the first agency (for demo - in production would be based on auth)
  const agency = await prisma.agency.findFirst()
  
  if (!agency) {
    return <div>No agency found. Please run: npm run db:seed</div>
  }

  const tickets = await prisma.ticket.findMany({
    where: { agencyId: agency.id },
    include: {
      property: true,
      tenant: true,
      artisan: true,
      photos: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const stats = {
    nouveau: tickets.filter((t) => t.status === 'nouveau').length,
    en_cours: tickets.filter((t) => ['valide', 'envoye', 'en_cours'].includes(t.status)).length,
    resolu: tickets.filter((t) => t.status === 'resolu').length,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-600">{agency.name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={AlertCircle}
          label="Nouvelles demandes"
          value={stats.nouveau}
          color="red"
        />
        <StatCard
          icon={Clock}
          label="En cours"
          value={stats.en_cours}
          color="yellow"
        />
        <StatCard
          icon={CheckCircle2}
          label="Résolues"
          value={stats.resolu}
          color="green"
        />
      </div>

      {/* Tickets list */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Demandes récentes
          </h2>
        </div>
        <div className="divide-y">
          {tickets.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              Aucune demande pour le moment
            </div>
          ) : (
            tickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/manager/tickets/${ticket.id}`}
                className="block px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold text-gray-900">
                        {TICKET_TYPES[ticket.type as keyof typeof TICKET_TYPES]}
                      </span>
                      <StatusBadge status={ticket.status} />
                      <UrgencyBadge urgency={ticket.urgency} />
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {ticket.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>📍 {ticket.property.address}</span>
                      {ticket.tenant && (
                        <span>
                          👤 {ticket.tenant.firstName} {ticket.tenant.lastName}
                        </span>
                      )}
                      {ticket.photos.length > 0 && (
                        <span>📷 {ticket.photos.length} photo(s)</span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 ml-4">
                    {formatDate(ticket.createdAt)}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any
  label: string
  value: number
  color: 'red' | 'yellow' | 'green'
}) {
  const colors = {
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-6 h-6" />
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
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
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
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[urgency] || 'bg-gray-100 text-gray-700'}`}>
      🔥 {TICKET_URGENCY[urgency as keyof typeof TICKET_URGENCY] || urgency}
    </span>
  )
}
