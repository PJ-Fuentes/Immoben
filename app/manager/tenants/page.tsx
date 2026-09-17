import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Plus, Phone, Mail, MapPin } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function TenantsPage() {
  const agency = await prisma.agency.findFirst()
  
  if (!agency) {
    return <div>No agency found. Please run: npm run db:seed</div>
  }

  const tenants = await prisma.tenant.findMany({
    where: { agencyId: agency.id },
    include: {
      property: true,
      _count: {
        select: { tickets: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Locataires</h1>
          <p className="text-gray-600">
            {tenants.length} locataire{tenants.length !== 1 ? 's' : ''} enregistré{tenants.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/manager/tenants/new"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouveau locataire</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tenants.map((tenant) => (
          <Link
            key={tenant.id}
            href={`/manager/tenants/${tenant.id}`}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {tenant.firstName} {tenant.lastName}
            </h3>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{tenant.property.address}</span>
              </div>
              {tenant.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{tenant.phone}</span>
                </div>
              )}
              {tenant.email && (
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{tenant.email}</span>
                </div>
              )}
            </div>

            <div className="text-sm text-gray-500">
              {tenant._count.tickets} demande{tenant._count.tickets !== 1 ? 's' : ''}
            </div>
          </Link>
        ))}

        {tenants.length === 0 && (
          <div className="col-span-2 bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 mb-4">Aucun locataire enregistré</p>
            <Link
              href="/manager/tenants/new"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter votre premier locataire</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
