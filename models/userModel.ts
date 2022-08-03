import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string | undefined;
  username: string;
  password: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
