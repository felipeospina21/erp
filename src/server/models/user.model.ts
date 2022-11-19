import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
  _id: string;
  email: string;
  password: string;
  image?: string;
  firstName?: string;
  lastName?: string;
}

const UserSchema = new Schema<User>(
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
    image: { type: String },
    firstName: { type: String },
    lastName: { type: String },
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

export const UserModel = model<User>('User', UserSchema);
