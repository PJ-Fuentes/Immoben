import { IssueStatus } from '@/types';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: IssueStatus;
}

const statusConfig = {
  pending: {
    label: 'En attente',
    className: 'bg-yellow-100 text-yellow-800',
  },
  in_progress: {
    label: 'En cours',
    className: 'bg-blue-100 text-blue-800',
  },
  resolved: {
    label: 'Résolu',
    className: 'bg-green-100 text-green-800',
  },
  closed: {
    label: 'Fermé',
    className: 'bg-gray-100 text-gray-800',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={clsx(
      'px-2 py-1 text-xs font-medium rounded-full',
      config.className
    )}>
      {config.label}
    </span>
  );
}
