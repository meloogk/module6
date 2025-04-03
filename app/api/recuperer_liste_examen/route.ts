import { NextApiRequest, NextApiResponse } from "next";
import { DBConnect } from "@/data/mongoose";
import { ExamModel } from "@/models/exam";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée" });
  }

  await DBConnect();

  try {
    // Vérifier si un filtre par statut est appliqué (ex: ?status=En attente)
    const { status } = req.query;
    const filter = status ? { status } : {};

    // Récupérer les examens avec le filtre
    const exams = await ExamModel.find(filter);

    if (!exams.length) {
      console.warn("⚠️ Aucun examen trouvé dans la base de données.");
      return res.status(404).json({ success: false, message: "Aucun examen trouvé", data: [] });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Examens récupérés avec succès", 
      data: exams 
    });

  } catch (error: any) {
    console.error("❌ Erreur lors de la récupération des examens :", error);
    return res.status(500).json({ 
      success: false, 
      message: "Erreur lors de la récupération des examens", 
      error: error.message 
    });
  }
}
