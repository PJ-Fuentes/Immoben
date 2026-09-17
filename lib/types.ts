export const TICKET_TYPES = {
  fuite: 'Fuite d\'eau',
  chaudiere: 'Chaudière',
  humidite: 'Humidité',
  chauffage: 'Chauffage',
  electromenager: 'Électroménager',
  autre: 'Autre',
  code_ean: 'Demande code EAN',
} as const

export const TICKET_URGENCY = {
  basse: 'Basse',
  moyenne: 'Moyenne',
  haute: 'Haute',
} as const

export const TICKET_STATUS = {
  nouveau: 'Nouveau',
  valide: 'Validé',
  envoye: 'Envoyé à l\'artisan',
  en_cours: 'En cours',
  resolu: 'Résolu',
} as const

export type TicketType = keyof typeof TICKET_TYPES
export type TicketUrgency = keyof typeof TICKET_URGENCY
export type TicketStatus = keyof typeof TICKET_STATUS
