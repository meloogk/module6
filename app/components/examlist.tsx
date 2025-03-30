"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import {fr} from "date-fns/locale/fr";
import { Exam, ExamStatus } from "@/type";

const exams: Exam[] = [
  { id: 1, patientName: "leonie", examType: "Analyse Sanguine", doctor: "Dr. X", status: "pending", date: new Date() },
  { id: 2, patientName: "yvan", examType: "Radiographie Thorax", doctor: "Dr.Y", status: "in_progress", date: new Date(), technician: "Tech. Jean Dupont" },
  { id: 3, patientName: "tidiane", examType: "Scanner Abdominal", doctor: "Dr. Z", status: "completed", date: new Date(), technician: "Tech. Anne Martin" }
];


interface ExamListProps {
  readonly onNewExam: () => void;
}

export default function ExamList({ onNewExam }: ExamListProps) {
  const [selectedStatus, setSelectedStatus] = useState<ExamStatus | "all">("all");

  const filteredExams = exams.filter((exam) =>
    selectedStatus === "all" ? true : exam.status === selectedStatus
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Gestion des Examens</h2>
        <div className="flex space-x-4">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-black"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ExamStatus | "all")}
          >
            <option value="all">Tous</option>
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminés</option>
          </select>
          <button onClick={onNewExam} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg">
            <Plus className="h-5 w-5 mr-2" /> Nouvel Examen
          </button>
        </div>
      </div>
      <div className="p-6">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => (
            <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-2 text-black">
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900">{exam.patientName}</p>
                <p className="text-sm text-gray-500">{exam.examType}</p>
              </div>
              <p className="text-sm">{format(exam.date, "d MMM yyyy", { locale: fr })}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">Aucun examen trouvé.</p>
        )}
      </div>
    </div>
  );
}
