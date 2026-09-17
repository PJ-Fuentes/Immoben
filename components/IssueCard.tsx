import Link from 'next/link';
import { Issue } from '@/types';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import CategoryIcon from './CategoryIcon';
import { Calendar, MapPin, MessageSquare } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  const formattedDate = new Date(issue.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link href={`/issue/${issue.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <CategoryIcon category={issue.category} className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
              <p className="text-sm text-gray-500">{issue.tenantName}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <StatusBadge status={issue.status} />
            <PriorityBadge priority={issue.priority} />
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{issue.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate max-w-xs">{issue.propertyAddress}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>{issue.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
