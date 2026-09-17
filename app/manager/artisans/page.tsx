import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Plus, Phone, Mail, Star } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ArtisansPage() {
  const agency = await prisma.agency.findFirst()
  
  if (!agency) {
    return <div>No agency found. Please run: npm run db:seed</div>
  }

  const artisans = await prisma.artisan.findMany({
    where: { agencyId: agency.id },
    include: {
      _count: {
        select: { tickets: true },
      },
    },
    orderBy: [
      { isDefault: 'desc' },
      { createdAt: 'desc' },
    ],
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Artisans</h1>
          <p className="text-gray-600">
            {artisans.length} artisan{artisans.length !== 1 ? 's' : ''} enregistré{artisans.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/manager/artisans/new"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvel artisan</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artisans.map((artisan) => (
          <Link
            key={artisan.id}
            href={`/manager/artisans/${artisan.id}`}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-900">
                {artisan.name}
              </h3>
              {artisan.isDefault && (
                <span className="flex items-center text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 mr-1" />
                  Par défaut
                </span>
              )}
            </div>
            
            {artisan.specialty && (
              <p className="text-sm text-gray-600 mb-3">{artisan.specialty}</p>
            )}

            <div className="space-y-2 text-sm mb-4">
              {artisan.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{artisan.phone}</span>
                </div>
              )}
              {artisan.email && (
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{artisan.email}</span>
                </div>
              )}
            </div>

            <div className="text-sm text-gray-500">
              {artisan._count.tickets} intervention{artisan._count.tickets !== 1 ? 's' : ''}
            </div>
          </Link>
        ))}

        {artisans.length === 0 && (
          <div className="col-span-2 bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 mb-4">Aucun artisan enregistré</p>
            <Link
              href="/manager/artisans/new"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter votre premier artisan</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
