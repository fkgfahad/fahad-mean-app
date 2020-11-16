export interface User {
  _id?: string;
  company?: {
    name: string;
    position: string;
    city: string;
  };
  date?: Date;
  disabled: boolean;
  email: string;
  image?: string;
  name: string;
  type?: 'admin' | 'user';
  username: string;
  verified: boolean;
}
