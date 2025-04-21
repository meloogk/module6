import { NextApiRequest, NextApiResponse } from "next";

const typesAnalyses = [
  { id: 1, name: "Analyse de sang" },
  { id: 2, name: "ECG" },
  { id: 3, name: "Radiographie" },
  { id: 4, name: "IRM" },
  { id: 5, name: "Echographie" },
  { id: 6, name: "Bilan lipidique" },
  { id: 7, name: "Test de la fonction hépatique" },
  { id: 8, name: "Test de la fonction rénale" },
  { id: 9, name: "Test de grossesse" },
  { id: 10, name: "Test de glycémie" },
  { id: 11, name: "Analyse des gaz sanguins" },
  { id: 12, name: "Test de dépistage du VIH" },
  { id: 13, name: "Analyse des selles" },
  { id: 14, name: "Test de dépistage du cancer" },
  { id: 15, name: "Test de la fonction thyroïdienne" },
  { id: 16, name: "Test de dépistage des MST" },
  { id: 17, name: "Test de la fonction pulmonaire" },
  { id: 18, name: "Bilan de vitamine D" },
  { id: 19, name: "Culture bactérienne" },
  { id: 20, name: "Test d'allergie" },
  { id: 21, name: "Test de dépistage de l'hépatite C" },
  { id: 22, name: "Test de dépistage de la tuberculose" },
  { id: 23, name: "Test de fonction gastro-intestinale" },
  { id: 24, name: "Test de la fonction cardiaque" },
  { id: 25, name: "Examen ophtalmologique" },
  { id: 26, name: "Examen ORL (Oto-rhino-laryngologique)" },
  { id: 27, name: "Test de dépistage du cancer du col de l'utérus (Pap smear)" },
  { id: 28, name: "Test de la fonction neurologique" },
  { id: 29, name: "Test de détection de l'alcool dans le sang" },
  { id: 30, name: "Test génétique" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({ data: typesAnalyses });
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
