import mongoose, { Schema, Document, Model } from "mongoose";
import { PortfolioDataType } from "@/lib/data";

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId | string;
  username: string;
  hero: PortfolioDataType["hero"];
  about: PortfolioDataType["about"];
  skills: PortfolioDataType["skills"];
  projects: PortfolioDataType["projects"];
  experience: PortfolioDataType["experience"];
  contact: PortfolioDataType["contact"];
  updatedAt: Date;
  createdAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userId: {
      type: Schema.Types.Mixed,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    hero: { type: Schema.Types.Mixed, required: true },
    about: { type: Schema.Types.Mixed, required: true },
    skills: { type: Schema.Types.Mixed, required: true },
    projects: { type: Schema.Types.Mixed, required: true },
    experience: { type: Schema.Types.Mixed, required: true },
    contact: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);

export const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio ||
  mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
