export interface Message {
  _id?: string;
  date: Date;
  name: string;
  email: string;
  message: string;
  letter: boolean;
  seen?: boolean;
}
