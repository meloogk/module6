import { NextApiRequest, NextApiResponse } from "next";
import { DBConnect } from "@/data/mongoose";
import { ExamModel } from "@/models/exam";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée" });
  }

  await DBConnect();

  try {
    const { patientName, examType, doctor, technician, date, status } = req.body;

    // Validation des champs obligatoires
    if (!patientName || !examType || !doctor || !technician || !date) {
      return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
    }

    // Création du nouvel examen
    const newExam = new ExamModel({
      patientName,
      examType,
      doctor,
      technician,
      date,
      status: status || "En attente", // Valeur par défaut si le statut n'est pas fourni
    });

    // Enregistrement dans la base de données
    await newExam.save();

    return res.status(201).json({ success: true, message: "Examen ajouté avec succès", data: newExam });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'examen:", error);
    return res.status(500).json({ success: false, message: "Erreur lors de l'ajout de l'examen", error: error.message });
  }
}
