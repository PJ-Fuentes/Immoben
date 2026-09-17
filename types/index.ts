export type IssueStatus = 'pending' | 'in_progress' | 'resolved' | 'closed';

export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';

export type IssueCategory = 
  | 'plumbing'
  | 'electrical'
  | 'heating'
  | 'appliances'
  | 'structure'
  | 'security'
  | 'other';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  status: IssueStatus;
  createdAt: Date;
  updatedAt: Date;
  tenantName: string;
  propertyAddress: string;
  images?: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  isLandlord: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tenant' | 'landlord';
  properties?: string[];
}
