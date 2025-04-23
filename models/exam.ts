import mongoose, { Schema } from "mongoose";

const ExamSchema = new Schema({
  patientName: { type: String, required: true },
  examType: { type: [String], required: true },
  doctor: { type: String, required: true },
  technician: { type: String, required: true },
  status: {type: String,required: true,
    enum: ["En attente", "En cours", "Terminé"],
  },
  result: { type: String, default: "" },
  date: { type: Date, default: Date.now }
});

export const ExamModel = mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
