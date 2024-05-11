import mongoose, { type Document, type Schema } from "mongoose";

export interface IRole extends Document {
  name: string;
}

const RolesSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Role = mongoose.model<IRole>("Role", RolesSchema);
export default Role;
