'use client'

import { useFormStatus } from 'react-dom'
import Link from 'next/link'

export default function ArtisanForm({ 
  action, 
  defaultValues 
}: { 
  action: (formData: FormData) => void
  defaultValues?: {
    name?: string
    specialty?: string
    email?: string
    phone?: string
    isDefault?: boolean
  }
}) {
  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nom de l'entreprise <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name}
          placeholder="MaBuild"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
          Spécialité
        </label>
        <input
          type="text"
          id="specialty"
          name="specialty"
          defaultValue={defaultValues?.specialty}
          placeholder="Tous travaux, Plomberie, Électricité..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={defaultValues?.email}
          placeholder="contact@mabuild.be"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          defaultValue={defaultValues?.phone}
          placeholder="+32 2 123 45 67"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isDefault"
          name="isDefault"
          defaultChecked={defaultValues?.isDefault}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
          Définir comme artisan par défaut
        </label>
      </div>

      <div className="flex items-center space-x-4 pt-4">
        <SubmitButton />
        <Link
          href="/manager/artisans"
          className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium"
        >
          Annuler
        </Link>
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? 'Enregistrement...' : 'Enregistrer'}
    </button>
  )
}
