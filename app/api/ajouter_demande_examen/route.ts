import { NextApiRequest, NextApiResponse } from "next";
import { DBConnect } from "@/data/mongoose";
import { ExamModel } from "@/models/exam"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await DBConnect(); 

    const { patientName, examType, doctor, technician, date, status } = req.body;

    try {
      
      const newExam = new ExamModel({
        patientName,
        examType,
        doctor,
        technician,
        date,
        status,
      });

      await newExam.save(); 
      res.status(201).json({ message: "ok", data: newExam }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de l'ajout de l'examen", error }); 
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" }); 
  }
}
