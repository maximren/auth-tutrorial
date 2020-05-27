import * as mongoose from 'mongoose';
import * as autoIncrement from 'mongoose-auto-increment';

import { IUser } from '../types/user.interface';

autoIncrement.initialize(mongoose.connection);

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
  empDepartment: {
    type: String,
    required: true
  },
  empActive: {
    type: String,
    required: true,
    default: "true",
  }
});

UserModel.plugin(autoIncrement.plugin, 'User');
export default mongoose.model<IUser>('User', UserModel);
