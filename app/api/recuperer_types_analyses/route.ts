import { NextResponse } from "next/server";
import { DBConnect } from "@/data/mongoose";
import { TypeAnalyseModel } from "@/models/type_analyse";

export async function GET() {
  try {
    await DBConnect();

    const typesAnalyses = await TypeAnalyseModel.find();

    if (!typesAnalyses.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Aucun type d’analyse trouvé",
          data: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Types d’analyses récupérés avec succès",
        data: typesAnalyses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
