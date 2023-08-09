import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: String,
  },
  {
    timestamps: true,
    collection: "projects",
  }
);

export const Project = model("Project", projectSchema);
