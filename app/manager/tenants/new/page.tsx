import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import TenantForm from './TenantForm'

export default async function NewTenantPage() {
  const agency = await prisma.agency.findFirst()

  if (!agency) {
    return <div>No agency found. Please run: npm run db:seed</div>
  }

  const properties = await prisma.property.findMany({
    where: { agencyId: agency.id },
    orderBy: { address: 'asc' },
  })

  async function createTenant(formData: FormData) {
    'use server'
    
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const propertyId = formData.get('propertyId') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

    const tenant = await prisma.tenant.create({
      data: {
        agencyId: agency!.id,
        propertyId,
        firstName,
        lastName,
        email: email || undefined,
        phone: phone || undefined,
      },
    })

    redirect(`/manager/tenants/${tenant.id}`)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nouveau locataire</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <TenantForm action={createTenant} properties={properties} />
      </div>
    </div>
  )
}
