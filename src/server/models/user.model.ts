import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [8, 'password should have a minimum of 8 characters'],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

export const User = model<IUser>('User', UserSchema);
