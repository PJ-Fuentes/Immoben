import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Plus, ExternalLink, Users } from 'lucide-react'
import PropertyLinkButton from './PropertyLinkButton'

export const dynamic = 'force-dynamic'

export default async function PropertiesPage() {
  const agency = await prisma.agency.findFirst()
  
  if (!agency) {
    return <div>No agency found. Please run: npm run db:seed</div>
  }

  const properties = await prisma.property.findMany({
    where: { agencyId: agency.id },
    include: {
      tenants: true,
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Biens</h1>
          <p className="text-gray-600">
            {properties.length} bien{properties.length !== 1 ? 's' : ''} enregistré{properties.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/manager/properties/new"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouveau bien</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {property.address}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {property.postalCode} {property.city}
                  </p>
                  {property.reference && (
                    <p className="text-sm text-gray-500">Réf: {property.reference}</p>
                  )}
                </div>
                <Link
                  href={`/manager/properties/${property.id}`}
                  className="text-blue-600 hover:text-blue-700 p-2"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{property.tenants.length} locataire{property.tenants.length !== 1 ? 's' : ''}</span>
                </div>
                <div>
                  {property._count.tickets} demande{property._count.tickets !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="border-t pt-4">
                <PropertyLinkButton propertyToken={property.token} />
              </div>
            </div>
          </div>
        ))}

        {properties.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 mb-4">Aucun bien enregistré</p>
            <Link
              href="/manager/properties/new"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter votre premier bien</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
