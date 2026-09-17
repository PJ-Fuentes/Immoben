'use client'

import { useFormStatus } from 'react-dom'
import Link from 'next/link'

export default function PropertyForm({ 
  action, 
  defaultValues 
}: { 
  action: (formData: FormData) => void
  defaultValues?: {
    address?: string
    city?: string
    postalCode?: string
    reference?: string
  }
}) {
  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Adresse <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          required
          defaultValue={defaultValues?.address}
          placeholder="Rue de la Loi 16"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
            Code postal <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            required
            defaultValue={defaultValues?.postalCode}
            placeholder="1000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            Ville <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            defaultValue={defaultValues?.city}
            placeholder="Bruxelles"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">
          Référence (optionnel)
        </label>
        <input
          type="text"
          id="reference"
          name="reference"
          defaultValue={defaultValues?.reference}
          placeholder="BRU-001"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center space-x-4 pt-4">
        <SubmitButton />
        <Link
          href="/manager/properties"
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
