import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import TenantForm from './TenantForm'

export default async function TenantRequestPage({
  params,
}: {
  params: { token: string }
}) {
  const property = await prisma.property.findUnique({
    where: { token: params.token },
    include: {
      tenants: true,
      agency: true,
    },
  })

  if (!property) {
    notFound()
  }

  const tenant = property.tenants[0] || null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Déclaration de panne
            </h1>
            <p className="text-gray-600">
              {property.agency.name}
            </p>
          </div>

          <TenantForm
            property={property}
            tenant={tenant}
            agencyId={property.agencyId}
          />
        </div>
      </div>
    </div>
  )
}
