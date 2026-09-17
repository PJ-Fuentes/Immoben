import { IssueCategory } from '@/types';
import { 
  Droplet, 
  Zap, 
  Flame, 
  Refrigerator, 
  Home, 
  Shield,
  MoreHorizontal 
} from 'lucide-react';

interface CategoryIconProps {
  category: IssueCategory;
  className?: string;
}

const categoryIcons = {
  plumbing: Droplet,
  electrical: Zap,
  heating: Flame,
  appliances: Refrigerator,
  structure: Home,
  security: Shield,
  other: MoreHorizontal,
};

export default function CategoryIcon({ category, className = 'w-5 h-5' }: CategoryIconProps) {
  const Icon = categoryIcons[category];
  return <Icon className={className} />;
}
