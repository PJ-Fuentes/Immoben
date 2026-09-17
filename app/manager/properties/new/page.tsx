import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { nanoid } from 'nanoid'
import PropertyForm from './PropertyForm'

export default async function NewPropertyPage() {
  const agency = await prisma.agency.findFirst()

  if (!agency) {
    return <div>No agency found. Please run: npm run db:seed</div>
  }

  async function createProperty(formData: FormData) {
    'use server'
    
    const address = formData.get('address') as string
    const city = formData.get('city') as string
    const postalCode = formData.get('postalCode') as string
    const reference = formData.get('reference') as string

    const property = await prisma.property.create({
      data: {
        agencyId: agency!.id,
        address,
        city,
        postalCode,
        reference: reference || undefined,
        token: nanoid(16),
      },
    })

    redirect(`/manager/properties/${property.id}`)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nouveau bien</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <PropertyForm action={createProperty} />
      </div>
    </div>
  )
}
