import { NextResponse } from "next/server";
import { DBConnect } from "@/data/mongoose";
import { ExamModel } from "@/models/exam";

export async function GET(req: Request) {
  try {
    await DBConnect();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const filter = status ? { status } : {};

    const exams = await ExamModel.find(filter);

    if (!exams.length) {
      return NextResponse.json({
        success: false,
        message: "Aucun examen trouvé",
        data: [],
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Examens récupérés avec succès",
      data: exams,
    });

  } catch (error) {
    
    if (error instanceof Error) {
      console.error("Erreur lors de la récupération des examens :", error);
      return NextResponse.json({
        success: false,
        message: "Erreur lors de la récupération des examens",
        error: error.message,  
      }, { status: 500 });
    }

    
    console.error(" Erreur inattendue :", error);
    return NextResponse.json({
      success: false,
      message: "Erreur inattendue",
    }, { status: 500 });
  }
}
