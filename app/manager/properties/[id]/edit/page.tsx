import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import PropertyForm from '../../new/PropertyForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditPropertyPage({
  params,
}: {
  params: { id: string }
}) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  })

  if (!property) {
    notFound()
  }

  async function updateProperty(formData: FormData) {
    'use server'
    
    const address = formData.get('address') as string
    const city = formData.get('city') as string
    const postalCode = formData.get('postalCode') as string
    const reference = formData.get('reference') as string

    await prisma.property.update({
      where: { id: params.id },
      data: {
        address,
        city,
        postalCode,
        reference: reference || null,
      },
    })

    redirect(`/manager/properties/${params.id}`)
  }

  return (
    <div className="max-w-2xl">
      <Link
        href={`/manager/properties/${property.id}`}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour au bien
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier le bien</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <PropertyForm 
          action={updateProperty}
          defaultValues={{
            address: property.address,
            city: property.city,
            postalCode: property.postalCode,
            reference: property.reference || undefined,
          }}
        />
      </div>
    </div>
  )
}
