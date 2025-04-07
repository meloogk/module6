import { NextResponse } from "next/server";
import { DBConnect } from "@/data/mongoose";
import { ExamModel } from "@/models/exam";

export const POST = async (req: Request) => {
  try {
    const { patientName, examType, doctor, technician, date, status } = await req.json();
    const db = await DBConnect();

    if (db === "ok") {
      const newExam = new ExamModel({
        patientName,
        examType,
        doctor,
        technician,
        date,
        status: status || "En attente",
      });

      await newExam.save();

      if (newExam) {
        return NextResponse.json({ message: "ok", data: newExam });
      } else {
        return NextResponse.json({ message: "Veuillez remplir correctement tous les champs !" });
      }
    } else {
      return NextResponse.json({ message: "Erreur de connexion à la base de donnée !" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur", error: `${error}` }, { status: 500 });
  }
};
