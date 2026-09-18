'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, AlertCircle, Check } from 'lucide-react'
import { TICKET_TYPES, TICKET_URGENCY } from '@/lib/types'
import type { Property, Tenant } from '@prisma/client'

interface TenantFormProps {
  property: Property
  tenant: Tenant | null
  agencyId: string
}

export default function TenantForm({ property, tenant, agencyId }: TenantFormProps) {
  const router = useRouter()
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [urgency, setUrgency] = useState<'basse' | 'moyenne' | 'haute'>('moyenne')
  const [photos, setPhotos] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setPhotos((prev) => [...prev, ...newFiles].slice(0, 5))
    }
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('agencyId', agencyId)
      formData.append('propertyId', property.id)
      if (tenant) formData.append('tenantId', tenant.id)
      formData.append('type', type)
      formData.append('description', description)
      formData.append('urgency', urgency)
      
      photos.forEach((photo) => {
        formData.append('photos', photo)
      })

      const res = await fetch('/api/tickets', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Erreur lors de la soumission')
      }

      setIsSuccess(true)
      setTimeout(() => {
        router.refresh()
      }, 2000)
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Demande envoyée !
        </h2>
        <p className="text-gray-600 mb-6">
          Votre demande a été transmise à votre gestionnaire.
          <br />
          Vous serez contacté prochainement.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false)
            setType('')
            setDescription('')
            setUrgency('moyenne')
            setPhotos([])
          }}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Faire une nouvelle demande
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Prefilled info */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-600">Logement</label>
          <p className="text-gray-900">
            {property.address}, {property.postalCode} {property.city}
          </p>
        </div>
        {tenant && (
          <>
            <div>
              <label className="text-sm font-medium text-gray-600">Locataire</label>
              <p className="text-gray-900">
                {tenant.firstName} {tenant.lastName}
              </p>
            </div>
            {tenant.phone && (
              <div>
                <label className="text-sm font-medium text-gray-600">Téléphone</label>
                <p className="text-gray-900">{tenant.phone}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Type of problem */}
      {/* Note: No explanatory text about internal routing (EAN/artisan) - tenants should not see process details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de problème <span className="text-red-500">*</span>
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sélectionnez...</option>
          {Object.entries(TICKET_TYPES).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          placeholder="Décrivez le problème en détail..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Urgency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Urgence <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(TICKET_URGENCY).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setUrgency(key as any)}
              className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                urgency === key
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Photos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photos (max 5)
        </label>
        <div className="space-y-3">
          {photos.length < 5 && (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <Camera className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Ajouter une photo</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoChange}
                multiple
                className="hidden"
              />
            </label>
          )}
          
          {photos.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 rounded-lg p-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !type || !description}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-lg"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
      </button>
    </form>
  )
}
