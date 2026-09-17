import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import TenantForm from '../../new/TenantForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditTenantPage({
  params,
}: {
  params: { id: string }
}) {
  const tenant = await prisma.tenant.findUnique({
    where: { id: params.id },
  })

  if (!tenant) {
    notFound()
  }

  const properties = await prisma.property.findMany({
    where: { agencyId: tenant.agencyId },
    orderBy: { address: 'asc' },
  })

  async function updateTenant(formData: FormData) {
    'use server'
    
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const propertyId = formData.get('propertyId') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

    await prisma.tenant.update({
      where: { id: params.id },
      data: {
        firstName,
        lastName,
        propertyId,
        email: email || null,
        phone: phone || null,
      },
    })

    redirect(`/manager/tenants/${params.id}`)
  }

  return (
    <div className="max-w-2xl">
      <Link
        href={`/manager/tenants/${tenant.id}`}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour au locataire
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier le locataire</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <TenantForm 
          action={updateTenant}
          properties={properties}
          defaultValues={{
            firstName: tenant.firstName,
            lastName: tenant.lastName,
            propertyId: tenant.propertyId,
            email: tenant.email || undefined,
            phone: tenant.phone || undefined,
          }}
        />
      </div>
    </div>
  )
}
