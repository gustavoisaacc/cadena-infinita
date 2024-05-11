import mongoose, { Types, type Document, type Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Types.ObjectId;
  isActive: boolean;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Types.ObjectId,
      ref: "Role",
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
