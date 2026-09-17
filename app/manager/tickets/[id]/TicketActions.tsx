'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Ticket, Artisan, Property, Tenant } from '@prisma/client'
import { Check, Copy, MessageSquare, Clock } from 'lucide-react'
import { TICKET_TYPES } from '@/lib/types'

type TicketWithRelations = Ticket & {
  property: Property
  tenant: Tenant | null
  artisan: Artisan | null
}

interface TicketActionsProps {
  ticket: TicketWithRelations
  artisans: Artisan[]
  isEanRequest: boolean
}

export default function TicketActions({ ticket, artisans, isEanRequest }: TicketActionsProps) {
  const router = useRouter()
  const [selectedArtisanId, setSelectedArtisanId] = useState(ticket.artisanId || '')
  const [note, setNote] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [copiedMessage, setCopiedMessage] = useState(false)

  const generateDraftMessage = () => {
    if (isEanRequest) {
      return `Bonjour ${ticket.tenant?.firstName || 'Madame/Monsieur'},

Voici le code EAN demandé pour votre logement situé ${ticket.property.address} :

[CODE EAN À INSÉRER ICI]

Ce code vous permettra de changer de fournisseur d'énergie.

Cordialement,
Gestion Locative`
    }

    const artisan = artisans.find((a) => a.id === selectedArtisanId)
    
    return `Bonjour ${artisan?.name || 'l\'artisan'},

Nous avons une intervention à planifier pour le bien suivant :

📍 Adresse : ${ticket.property.address}, ${ticket.property.postalCode} ${ticket.property.city}
${ticket.tenant ? `👤 Locataire : ${ticket.tenant.firstName} ${ticket.tenant.lastName}` : ''}
${ticket.tenant?.phone ? `📞 Téléphone : ${ticket.tenant.phone}` : ''}

🔧 Type de problème : ${TICKET_TYPES[ticket.type as keyof typeof TICKET_TYPES]}
📝 Description : ${ticket.description}
⚠️ Urgence : ${ticket.urgency === 'haute' ? 'Haute - intervention rapide souhaitée' : ticket.urgency === 'moyenne' ? 'Moyenne' : 'Basse'}

Pourriez-vous me confirmer vos disponibilités pour cette intervention ?

Merci,
Ben Gestion Locative`
  }

  const copyDraftMessage = () => {
    const message = generateDraftMessage()
    navigator.clipboard.writeText(message)
    setCopiedMessage(true)
    setTimeout(() => setCopiedMessage(false), 2000)
  }

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          artisanId: selectedArtisanId || null,
          note: note || undefined,
        }),
      })

      if (!res.ok) throw new Error('Update failed')

      setNote('')
      router.refresh()
    } catch (error) {
      alert('Erreur lors de la mise à jour')
    } finally {
      setIsUpdating(false)
    }
  }

  const canValidate = ticket.status === 'nouveau'
  const canSendToArtisan = ticket.status === 'valide' && selectedArtisanId && !isEanRequest
  const canMarkInProgress = ticket.status === 'envoye'
  const canResolve = ['valide', 'envoye', 'en_cours'].includes(ticket.status)

  return (
    <div className="space-y-6">
      {/* Artisan selection (if not EAN) */}
      {!isEanRequest && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Artisan
          </label>
          <select
            value={selectedArtisanId}
            onChange={(e) => setSelectedArtisanId(e.target.value)}
            disabled={ticket.status === 'resolu'}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">Sélectionnez un artisan...</option>
            {artisans.map((artisan) => (
              <option key={artisan.id} value={artisan.id}>
                {artisan.name} {artisan.isDefault && '(Par défaut)'} {artisan.specialty && `- ${artisan.specialty}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Note */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Note (optionnelle)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Ajouter une note à l'historique..."
          disabled={ticket.status === 'resolu'}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100"
        />
      </div>

      {/* Status actions */}
      <div className="space-y-3">
        {canValidate && (
          <button
            onClick={() => updateStatus('valide')}
            disabled={isUpdating}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Check className="w-5 h-5" />
            <span>Valider la demande</span>
          </button>
        )}

        {ticket.status === 'valide' && (
          <button
            onClick={copyDraftMessage}
            className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            {copiedMessage ? (
              <>
                <Check className="w-5 h-5" />
                <span>Message copié !</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-5 h-5" />
                <span>Copier message {isEanRequest ? 'locataire' : 'artisan'}</span>
              </>
            )}
          </button>
        )}

        {canSendToArtisan && (
          <button
            onClick={() => updateStatus('envoye')}
            disabled={isUpdating}
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Copy className="w-5 h-5" />
            <span>Marquer comme envoyé à l'artisan</span>
          </button>
        )}

        {canMarkInProgress && (
          <button
            onClick={() => updateStatus('en_cours')}
            disabled={isUpdating}
            className="w-full flex items-center justify-center space-x-2 bg-yellow-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Clock className="w-5 h-5" />
            <span>Marquer comme en cours</span>
          </button>
        )}

        {canResolve && (
          <button
            onClick={() => updateStatus('resolu')}
            disabled={isUpdating}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Check className="w-5 h-5" />
            <span>Marquer comme résolu</span>
          </button>
        )}
      </div>

      {/* Draft message preview */}
      {ticket.status === 'valide' && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Aperçu du message {isEanRequest ? 'locataire' : 'artisan'} :
          </h4>
          <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans">
            {generateDraftMessage()}
          </pre>
        </div>
      )}
    </div>
  )
}
