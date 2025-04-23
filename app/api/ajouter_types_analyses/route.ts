import { NextResponse } from "next/server";
import { DBConnect } from "@/data/mongoose";
import { TypeAnalyseModel } from "@/models/type_analyse";

export async function POST(req: Request) {
  try {
    
    await DBConnect();

    // Récupérer les données du corps de la requête (type d'analyse)
    const { name } = await req.json();

    // Vérifier si le nom est fourni
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Le nom du type d'analyse est requis",
        },
        { status: 400 }
      );
    }

    // Créer un nouveau type d'analyse
    const newTypeAnalyse = new TypeAnalyseModel({ name });

    // Sauvegarder dans la base de données
    await newTypeAnalyse.save();

    return NextResponse.json(
      {
        success: true,
        message: "Type d'analyse ajouté avec succès",
        data: newTypeAnalyse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'ajout",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
