import { User } from './user.model';

export interface Testimonial {
  _id?: string;
  date: Date;
  name: string;
  speech: string;
  show?: boolean;
}
