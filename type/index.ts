export type ExamStatus = "En attente" | "En cours" | "Terminé";

export interface Exam {
  _id: string;
  patientName: string;
  examType: string;
  doctor: string;
  status: ExamStatus;
  date: Date;
  technician?: string;
}
