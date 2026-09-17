'use client'

import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import type { Property } from '@prisma/client'

export default function TenantForm({ 
  action, 
  properties,
  defaultValues 
}: { 
  action: (formData: FormData) => void
  properties: Property[]
  defaultValues?: {
    firstName?: string
    lastName?: string
    propertyId?: string
    email?: string
    phone?: string
  }
}) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            defaultValue={defaultValues?.firstName}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            defaultValue={defaultValues?.lastName}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
          Bien <span className="text-red-500">*</span>
        </label>
        <select
          id="propertyId"
          name="propertyId"
          required
          defaultValue={defaultValues?.propertyId}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sélectionnez un bien...</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.address}, {property.postalCode} {property.city}
            </option>
          ))}
        </select>
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
          placeholder="+32 470 12 34 56"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center space-x-4 pt-4">
        <SubmitButton />
        <Link
          href="/manager/tenants"
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
