import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  emal: string;
  password: string;
  date: Date;
}
