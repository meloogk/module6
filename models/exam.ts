import mongoose, { Schema } from "mongoose";

const ExamSchema = new Schema(
    {
        patientName: { type: String, required: true },
        examType: { type: String, required: true },
        doctor: {type: String,required: true},
        technician: { type: String, required: true },
        status: { type: String, required: true, enum: ["En attente", "En cours", "Terminé"] },
        result: { type: String, default: "" }, // Les résultats peuvent être vides au départ
        date: { type: Date, default: Date.now }, // La date de création est automatiquement définie sur la date actuelle
    }
  );
  
  export const ExamModel = mongoose.models.Document || mongoose.model("Exam", ExamSchema);
  