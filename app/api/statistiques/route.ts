import {  NextResponse } from "next/server";
import { DBConnect } from "@/data/mongoose";
import { ExamModel } from "@/models/exam";

export async function GET() {
  try {
    await DBConnect();

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [patientsToday, examsInProgress, examsCompleted, examsPending] = await Promise.all([
      ExamModel.countDocuments({ date: { $gte: startOfDay } }),
      ExamModel.countDocuments({ status: "En cours" }),
      ExamModel.countDocuments({ status: "Terminé" }),
      ExamModel.countDocuments({ status: "En attente" }),
    ]);

    return NextResponse.json({
      patientsToday,
      examsInProgress,
      examsCompleted,
      examsPending,
    });
  } catch (error) {
    console.error("Erreur back-end stats:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des statistiques" },
      { status: 500 }
    );
  }
}
