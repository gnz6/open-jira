import mongoose, { Schema, Model } from "mongoose";
import { Entry } from "../interfaces/entry";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, requied: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "completed"],
      message: "{VALUE} is not a valid status",
    },
  },
});

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
