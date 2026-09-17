'use client'

import { useState } from 'react'
import { Copy, Check, QrCode } from 'lucide-react'

export default function PropertyLinkButton({ propertyToken }: { propertyToken: string }) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [qrCode, setQrCode] = useState('')

  const fullUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/demande/${propertyToken}`
    : ''

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      alert('Erreur lors de la copie')
    }
  }

  const generateQR = async () => {
    try {
      const res = await fetch(`/api/qr?url=${encodeURIComponent(fullUrl)}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setQrCode(url)
      setShowQR(true)
    } catch (err) {
      alert('Erreur lors de la génération du QR code')
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={fullUrl}
          readOnly
          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600"
        />
        <button
          onClick={copyLink}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copié !</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copier</span>
            </>
          )}
        </button>
        <button
          onClick={generateQR}
          className="inline-flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          <QrCode className="w-4 h-4" />
          <span>QR Code</span>
        </button>
      </div>

      {showQR && qrCode && (
        <div className="border-t pt-3 text-center">
          <img src={qrCode} alt="QR Code" className="mx-auto w-48 h-48" />
          <p className="text-xs text-gray-500 mt-2">
            À partager via WhatsApp ou à afficher dans le logement
          </p>
        </div>
      )}
    </div>
  )
}
