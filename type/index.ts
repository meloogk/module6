export enum ExamStatus {
  EN_ATTENTE = "En attente",
  EN_COURS = "En cours",
  TERMINE = "Terminé",
}


export interface Exam {
  _id: string;
  patientName: string;
  examType: string;
  doctor: string;
  status: ExamStatus;
  date: Date;
  technician?: string;
}
