import { useEffect, useState } from "react";
import { PlusCircle, X, CheckCircle, Clock } from "lucide-react";
import NewExamForm from "./newexamform";

interface Exam {
  _id: string;
  patientName: string;
  examType: string;
  doctor: string;
  technician: string;
  date: string;
  status: string;
}

export default function ExamList() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("/api/recuperer_liste_examen");
        if (!response.ok) throw new Error("Erreur API");
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

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "En cours":
        return <Clock className="text-yellow-500" />;
      case "Terminé":
        return <CheckCircle className="text-green-500" />;
      case "En attente":
        return <X className="text-red-500" />;
      default:
        return <Clock className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Liste des examens</h2>
        <button 
          className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Ajouter un Examen
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Médecin</th>
                <th className="p-3 text-left">Technicien</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Statut</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-black fw-bold">{exam.patientName}</td>
                  <td className="p-3 text-red-500">{exam.examType}</td>
                  <td className="p-3 text-green-500">{exam.doctor}</td>
                  <td className="p-3 text-blue-500">{exam.technician}</td>
                  <td className="p-3 text-yellow-500">{new Date(exam.date).toLocaleDateString()}</td>
                  <td className="p-3 text-center">{getStatusBadge(exam.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal d'ajout */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">NOUVELLE DEMANDE D&apos;EXAMEN / ANALYSES</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <NewExamForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
