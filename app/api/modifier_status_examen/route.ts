import { NextResponse } from "next/server";
import { DBConnect } from "@/data/mongoose";
import { ExamModel } from "@/models/exam";

export async function POST(req: Request) {
  try {
    await DBConnect();

    const { id, nouveauStatut } = await req.json();

    // Vérification de la validité du statut
    const statutsValides = ["En attente", "En cours", "Terminé"];
    if (!statutsValides.includes(nouveauStatut)) {
      return NextResponse.json(
        { message: "Statut invalide" },
        { status: 400 }
      );
    }

    // Mise à jour de l'examen
    const exam = await ExamModel.findByIdAndUpdate(
      id,
      { status: nouveauStatut },
      { new: true }
    );

    if (!exam) {
      return NextResponse.json(
        { message: "Examen introuvable" },
        { status: 404 }
      );
    }

    // Recalcul des stats
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [patientsToday, examsInProgress, examsCompleted, examsPending] =
      await Promise.all([
        ExamModel.countDocuments({ date: { $gte: startOfDay } }),
        ExamModel.countDocuments({ status: "En cours" }),
        ExamModel.countDocuments({ status: "Terminé" }),
        ExamModel.countDocuments({ status: "En attente" }),
      ]);

    return NextResponse.json({
      message: "Statut mis à jour avec succès",
      examen: exam,
      stats: {
        patientsToday,
        examsInProgress,
        examsCompleted,
        examsPending,
      },
    });
  } catch (error) {
    console.error("Erreur back-end (modification statut):", error);
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour du statut" },
      { status: 500 }
    );
  }
}
