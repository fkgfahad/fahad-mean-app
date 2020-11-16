import { User } from './user.model';

export interface Project {
  _id?: string;
  date: Date;
  appType: 'web' | 'app' | 'other';
  budget?: number;
  deadline?: number;
  detail: string;
  client?: User;
  files?: Files[];
}

interface Files {
  url: string;
  type: string;
}
