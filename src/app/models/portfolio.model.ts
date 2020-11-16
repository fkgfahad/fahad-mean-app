import { Skill } from './skill.model';

export interface Portfolio {
  _id?: string;
  date: Date;
  title: string;
  subtitle: string;
  images: string[];
  link: string;
  publish?: boolean;
  skills: Skill[];
  detail: string;
  sourceCode?: string;
}
