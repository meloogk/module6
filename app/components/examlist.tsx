import { useEffect, useState } from "react";
import { PlusCircle, X, CheckCircle, Clock, Hourglass } from "lucide-react";
import NewExamForm from "./newexamform";
import { Exam, ExamStatus } from "@/type"; // Assurez-vous que 'ExamStatus' est importé comme une énumération

export default function ExamList() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  // Fonction pour mettre à jour le statut d'un examen
  const updateExamStatus = async (id: string, nouveauStatut: ExamStatus) => {
    try {
      const res = await fetch("/api/modifier_status_examen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nouveauStatut }),
      });

      const data = await res.json();

      if (res.ok) {
        // Mise à jour de l'UI après succès
        setExams((prevExams) =>
          prevExams.map((exam) =>
            exam._id === id ? { ...exam, status: nouveauStatut } : exam
          )
        );
      } else {
        console.error("Erreur API :", data.message);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

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

  // Extraction de la logique de changement de statut
  const getNextStatus = (currentStatus: ExamStatus) => {
    switch (currentStatus) {
      case ExamStatus.EN_ATTENTE:
        return ExamStatus.EN_COURS;
      case ExamStatus.EN_COURS:
        return ExamStatus.TERMINE;
      default:
        return ExamStatus.EN_ATTENTE;
    }
  };

  const getStatusBadge = (status: ExamStatus) => {
    switch (status) {
      case ExamStatus.EN_COURS:
        return <Clock className="text-yellow-500" />;
      case ExamStatus.TERMINE:
        return <CheckCircle className="text-green-500" />;
      case ExamStatus.EN_ATTENTE:
        return <Hourglass className="text-red-500" />;
      default:
        return <X className="text-gray-500" />;
    }
  };

  const handleFilterClick = (status: string) => {
    setSelectedStatus(status);
  };

  const filteredExams = selectedStatus
    ? exams.filter((exam) => exam.status.toLowerCase() === selectedStatus.toLowerCase())
    : exams;

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

      {/* Filtrage par statut */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleFilterClick("en cours")}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          type="button"
        >
          En cours
        </button>
        <button
          onClick={() => handleFilterClick("terminé")}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          type="button"
        >
          Terminé
        </button>
        <button
          onClick={() => handleFilterClick("en attente")}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          type="button"
        >
          En attente
        </button>
        <button
          onClick={() => setSelectedStatus("")}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          type="button"
        >
          Tout afficher
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
              {filteredExams.map((exam) => (
                <tr key={exam._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-black fw-bold">{exam.patientName}</td>
                  <td className="p-3 text-red-500">{exam.examType}</td>
                  <td className="p-3 text-green-500">{exam.doctor}</td>
                  <td className="p-3 text-blue-500">{exam.technician}</td>
                  <td className="p-3 text-yellow-500">{new Date(exam.date).toLocaleDateString()}</td>
                  <td className="p-3 text-center">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        const nextStatus = getNextStatus(exam.status);
                        updateExamStatus(exam._id, nextStatus);
                      }}
                      type="button"
                      aria-label="Modifier le statut"
                    >
                      {getStatusBadge(exam.status)}
                    </button>
                  </td>
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
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
                type="button"
                aria-label="Fermer le modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <NewExamForm onClose={() => setShowModal(false)} onSubmit={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
}
