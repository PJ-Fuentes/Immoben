import { IssuePriority } from '@/types';
import { clsx } from 'clsx';

interface PriorityBadgeProps {
  priority: IssuePriority;
}

const priorityConfig = {
  low: {
    label: 'Basse',
    className: 'bg-gray-100 text-gray-700',
  },
  medium: {
    label: 'Moyenne',
    className: 'bg-orange-100 text-orange-700',
  },
  high: {
    label: 'Haute',
    className: 'bg-red-100 text-red-700',
  },
  urgent: {
    label: 'Urgente',
    className: 'bg-red-200 text-red-900 font-bold',
  },
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <span className={clsx(
      'px-2 py-1 text-xs font-medium rounded-full',
      config.className
    )}>
      {config.label}
    </span>
  );
}
