import { IssueCategory } from '@/types';

export const categoryLabels: Record<IssueCategory, string> = {
  plumbing: 'Plomberie',
  electrical: 'Électricité',
  heating: 'Chauffage',
  appliances: 'Électroménager',
  structure: 'Structure',
  security: 'Sécurité',
  other: 'Autre',
};

export function getCategoryLabel(category: IssueCategory): string {
  return categoryLabels[category];
}

export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('fr-FR', options || defaultOptions);
}

export function formatDateTime(date: Date): string {
  return formatDate(date, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
