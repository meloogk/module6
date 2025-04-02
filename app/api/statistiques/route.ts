import { NextApiRequest, NextApiResponse } from "next";
import { DBConnect } from "@/data/mongoose";
import { ExamModel } from "@/models/exam";

const getStats = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    await DBConnect();

    const patientsToday = await ExamModel.countDocuments({ date: { $gte: new Date().setHours(0, 0, 0, 0) } });
    const examsInProgress = await ExamModel.countDocuments({ status: "En cours" });
    const examsCompleted = await ExamModel.countDocuments({ status: "Terminé" });

    return res.status(200).json({ patientsToday, examsInProgress, examsCompleted });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la récupération des statistiques" });
  }
};

export default getStats;
