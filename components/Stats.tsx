import { Issue } from '@/types';
import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

interface StatsProps {
  issues: Issue[];
}

export default function Stats({ issues }: StatsProps) {
  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'pending').length,
    inProgress: issues.filter(i => i.status === 'in_progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    urgent: issues.filter(i => i.priority === 'urgent').length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">En attente</p>
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
          </div>
          <Clock className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">En cours</p>
            <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
          </div>
          <AlertCircle className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Résolues</p>
            <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Urgentes</p>
            <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
          </div>
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
      </div>
    </div>
  );
}
