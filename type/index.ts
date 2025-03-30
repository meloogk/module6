export type ExamStatus = "pending" | "in_progress" | "completed";

export interface Exam {
  id: number;
  patientName: string;
  examType: string;
  doctor: string;
  status: ExamStatus;
  date: Date;
  technician?: string;
}
