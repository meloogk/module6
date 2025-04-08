import { useEffect, useState } from "react";
import Stats from "./stats";
import ExamList from "./examlist";
import { Exam } from "@/type"; 

export default function Dashboard() {
 
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("/api/recuperer_liste_examen");
        const data = await response.json();
        setExams(data.data);
      } catch (error) {
        console.error("Erreur de récupération:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Appliquer le filtre localement
  const filteredExams = filterStatus
    ? exams.filter((exam) => exam.status.toLowerCase() === filterStatus.toLowerCase())
    : exams;

  return (
    <div className="p-6">
      <Stats exams={exams} onFilterChange={setFilterStatus} activeFilter={filterStatus} />
      <ExamList exams={filteredExams} loading={loading} />
    </div>
  );
}
