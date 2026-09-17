import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import ArtisanForm from '../../new/ArtisanForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditArtisanPage({
  params,
}: {
  params: { id: string }
}) {
  const artisan = await prisma.artisan.findUnique({
    where: { id: params.id },
  })

  if (!artisan) {
    notFound()
  }

  async function updateArtisan(formData: FormData) {
    'use server'
    
    const name = formData.get('name') as string
    const specialty = formData.get('specialty') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const isDefault = formData.get('isDefault') === 'on'

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.artisan.updateMany({
        where: { 
          agencyId: artisan!.agencyId,
          isDefault: true,
          NOT: { id: params.id }
        },
        data: { isDefault: false },
      })
    }

    await prisma.artisan.update({
      where: { id: params.id },
      data: {
        name,
        specialty: specialty || null,
        email: email || null,
        phone: phone || null,
        isDefault,
      },
    })

    redirect(`/manager/artisans/${params.id}`)
  }

  return (
    <div className="max-w-2xl">
      <Link
        href={`/manager/artisans/${artisan.id}`}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour à l&apos;artisan
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier l&apos;artisan</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <ArtisanForm 
          action={updateArtisan}
          defaultValues={{
            name: artisan.name,
            specialty: artisan.specialty || undefined,
            email: artisan.email || undefined,
            phone: artisan.phone || undefined,
            isDefault: artisan.isDefault,
          }}
        />
      </div>
    </div>
  )
}
