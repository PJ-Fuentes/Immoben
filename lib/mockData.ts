import { Issue } from '@/types';

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Fuite d\'eau dans la salle de bain',
    description: 'Il y a une fuite d\'eau sous le lavabo de la salle de bain. L\'eau coule continuellement.',
    category: 'plumbing',
    priority: 'high',
    status: 'pending',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    tenantName: 'Marie Dupont',
    propertyAddress: '15 Rue de la Paix, 75002 Paris',
    comments: [
      {
        id: 'c1',
        author: 'Marie Dupont',
        content: 'La fuite s\'aggrave. Besoin d\'une intervention rapide.',
        createdAt: new Date('2024-01-15'),
        isLandlord: false,
      }
    ],
  },
  {
    id: '2',
    title: 'Chauffage ne fonctionne pas',
    description: 'Le chauffage central ne fonctionne plus depuis hier soir. Il fait très froid dans l\'appartement.',
    category: 'heating',
    priority: 'urgent',
    status: 'in_progress',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16'),
    tenantName: 'Jean Martin',
    propertyAddress: '42 Avenue des Champs, 69001 Lyon',
    comments: [
      {
        id: 'c2',
        author: 'Jean Martin',
        content: 'Urgent, il fait 12°C dans l\'appartement.',
        createdAt: new Date('2024-01-14'),
        isLandlord: false,
      },
      {
        id: 'c3',
        author: 'Propriétaire',
        content: 'Un technicien interviendra demain matin à 9h.',
        createdAt: new Date('2024-01-15'),
        isLandlord: true,
      }
    ],
  },
  {
    id: '3',
    title: 'Ampoule grillée dans le couloir',
    description: 'L\'ampoule du couloir principal est grillée.',
    category: 'electrical',
    priority: 'low',
    status: 'resolved',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    tenantName: 'Sophie Bernard',
    propertyAddress: '8 Rue du Commerce, 33000 Bordeaux',
    comments: [
      {
        id: 'c4',
        author: 'Propriétaire',
        content: 'Ampoule changée aujourd\'hui.',
        createdAt: new Date('2024-01-12'),
        isLandlord: true,
      }
    ],
  },
  {
    id: '4',
    title: 'Porte d\'entrée difficile à fermer',
    description: 'La porte d\'entrée est difficile à fermer, il faut forcer. Problème de serrure ou de gonds.',
    category: 'security',
    priority: 'medium',
    status: 'pending',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    tenantName: 'Pierre Dubois',
    propertyAddress: '23 Boulevard Voltaire, 75011 Paris',
    comments: [],
  },
  {
    id: '5',
    title: 'Réfrigérateur fait un bruit anormal',
    description: 'Le réfrigérateur fait un bruit de cliquetis constant depuis 3 jours.',
    category: 'appliances',
    priority: 'medium',
    status: 'in_progress',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-15'),
    tenantName: 'Claire Rousseau',
    propertyAddress: '56 Rue de la République, 13001 Marseille',
    comments: [
      {
        id: 'c5',
        author: 'Propriétaire',
        content: 'J\'ai contacté un réparateur, il passera cette semaine.',
        createdAt: new Date('2024-01-15'),
        isLandlord: true,
      }
    ],
  },
];
