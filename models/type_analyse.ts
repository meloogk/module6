import mongoose, { Schema } from "mongoose";

const TypeAnalyseSchema = new Schema({
  name: { type: String, required: true },
});

export const TypeAnalyseModel =
  mongoose.models.TypeAnalyse || mongoose.model("TypeAnalyse", TypeAnalyseSchema);
