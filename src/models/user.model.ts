import mongoose, { Types, type Document, type Schema } from "mongoose";
import { categories } from "../schemas/user.schema";

export type Categories = (typeof categories)[keyof typeof categories];

interface IUser extends Document {
  name: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: Types.ObjectId[];
  isActive: boolean;
  category: Categories;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: [
      {
        type: Types.ObjectId,
        ref: "Role",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      enum: Object.values(categories),
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
