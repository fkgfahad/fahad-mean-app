export interface Skill {
  _id?: string;
  name: string;
  value: string;
  type: 'frontend' | 'backend' | 'database' | 'tool' | 'cloud';
  description: string;
  filter: number;
}
