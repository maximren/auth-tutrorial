import * as mongoose from 'mongoose';

import { IUser } from '../types/user.interface';

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    min: 8,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<IUser>('User', UserModel);
