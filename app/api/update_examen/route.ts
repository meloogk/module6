import { NextApiRequest, NextApiResponse } from "next";
import { DBConnect } from "@/data/mongoose";
import { ExamModel } from "@/models/exam";

const updateExam = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "L'ID de l'examen est requis" });
  }

  try {
    await DBConnect();

    // Vérifier que les données envoyées sont valides
    const { patientName, examType, doctor, technician, status, date, result } = req.body;

    if (!patientName || !examType || !status) {
      return res.status(400).json({ message: "Les champs 'patientName', 'examType' et 'status' sont obligatoires." });
    }

    // Mise à jour de l'examen
    const updatedExam = await ExamModel.findByIdAndUpdate(
      id,
      { patientName, examType, doctor, technician, status, date, result },
      { new: true, runValidators: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ message: "Examen non trouvé" });
    }

    return res.status(200).json(updatedExam);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour de l'examen" });
  }
};

export default updateExam;
