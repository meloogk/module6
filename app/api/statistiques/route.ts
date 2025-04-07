import { NextResponse } from "next/server";
import { DBConnect } from "@/data/mongoose";
import { ExamModel } from "@/models/exam";

const getStats = async (req: Request, ) => {
  if (req.method !== "GET") {
    return NextResponse.json({ message: "Méthode non autorisée" });
  }

  try {
    await DBConnect();

    
    const patientsToday = await ExamModel.countDocuments({
      date: { $gte: new Date().setHours(0, 0, 0, 0) },
    });
    const examsInProgress = await ExamModel.countDocuments({
      status: "En cours",
    });
    const examsCompleted = await ExamModel.countDocuments({
      status: "Terminé",
    });
    const examsPending = await ExamModel.countDocuments({
      status: "En attente",
    });

    return NextResponse.json({
      patientsToday,
      examsInProgress,
      examsCompleted,
      examsPending, 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur lors de la récupération des statistiques" });
  }
};

export default getStats;
