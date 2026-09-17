import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import ArtisanForm from './ArtisanForm'

export default async function NewArtisanPage() {
  const agency = await prisma.agency.findFirst()

  if (!agency) {
    return <div>No agency found. Please run: npm run db:seed</div>
  }

  async function createArtisan(formData: FormData) {
    'use server'
    
    const name = formData.get('name') as string
    const specialty = formData.get('specialty') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const isDefault = formData.get('isDefault') === 'on'

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.artisan.updateMany({
        where: { agencyId: agency!.id, isDefault: true },
        data: { isDefault: false },
      })
    }

    const artisan = await prisma.artisan.create({
      data: {
        agencyId: agency!.id,
        name,
        specialty: specialty || undefined,
        email: email || undefined,
        phone: phone || undefined,
        isDefault,
      },
    })

    redirect(`/manager/artisans/${artisan.id}`)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nouvel artisan</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <ArtisanForm action={createArtisan} />
      </div>
    </div>
  )
}
