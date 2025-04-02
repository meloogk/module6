export type ExamStatus = "En attente" | "En cours" | "Terminé";

export interface Exam {
  id: string;
  patientName: string;
  examType: string;
  doctor: string;
  status: ExamStatus;
  date: Date;
  technician?: string;
}
