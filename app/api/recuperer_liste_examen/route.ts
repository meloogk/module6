import { NextApiRequest, NextApiResponse } from "next";
import { DBConnect } from "@/data/mongoose"; 
import { ExamModel } from "@/models/exam"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await DBConnect(); 

    try {
      const exams = await ExamModel.find(); 

      if (exams.length === 0) {
        
        console.log("Aucun examen trouvé dans la base de données");
        return res.status(404).json({ success: false, message: "Aucun examen trouvé", data: [] });
      }

      
      return res.status(200).json({ success: true, message: "Examen récupérés avec succès", data: exams });

    } catch (error) {
      console.error("Erreur lors de la récupération des examens:", error);
      return res.status(500).json({ success: false, message: "Erreur lors de la récupération des examens", error: error.message });
    }
  } else {
    
    return res.status(405).json({ success: false, message: "Méthode non autorisée" });
  }
}
