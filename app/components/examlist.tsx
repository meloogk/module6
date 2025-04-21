import { useEffect, useState } from "react";
import {
  PlusCircle,
  X,
  CheckCircle,
  Clock,
  Hourglass,
  UploadCloud,
  EyeOff,
  Send,
  Repeat2,
  LucideIcon,
} from "lucide-react";
import NewExamForm from "./newexamform";
import { Exam, ExamStatus } from "@/type";

export default function ExamList() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [resultsUploaded, setResultsUploaded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/recuperer_liste_examen");
        if (!res.ok) throw new Error("Erreur API");
        const { data } = await res.json();
        setExams(data);
      } catch (err) {
        console.error("Erreur de récupération :", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateExamStatus = async (id: string, nouveauStatut: ExamStatus) => {
    try {
      const res = await fetch("/api/modifier_status_examen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nouveauStatut }),
      });
      const { message } = await res.json();
      if (res.ok) {
        setExams((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: nouveauStatut } : e))
        );
      } else {
        console.error("Erreur API :", message);
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  };

  const getNextStatus = (current: ExamStatus) => {
    switch (current) {
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
        return <Clock className="w-5 h-5 inline-block text-yellow-500" />;
      case ExamStatus.TERMINE:
        return <CheckCircle className="w-5 h-5 inline-block text-green-500" />;
      case ExamStatus.EN_ATTENTE:
        return <Hourglass className="w-5 h-5 inline-block text-red-500" />;
      default:
        return <X className="w-5 h-5 inline-block text-gray-500" />;
    }
  };

  const handleResultsUpload = (id: string) => {
    setResultsUploaded((prev) => ({ ...prev, [id]: true }));
  };
  const handleHideResults = (id: string) => {
    setResultsUploaded((prev) => ({ ...prev, [id]: false }));
  };
  const handleSendResults = (id: string) => {
    console.log("Envoyer résultats pour :", id);
  };

  const filtered = selectedStatus
    ? exams.filter((e) => e.status.toLowerCase() === selectedStatus.toLowerCase())
    : exams;

  const ActionButton = ({
    onClick,
    icon: Icon,
    color,
    title,
  }: {
    onClick: () => void;
    icon: LucideIcon;
    color: "indigo" | "blue" | "gray" | "green";
    title: string;
  }) => {
    const colorMap: Record<string, string> = {
      indigo: "bg-indigo-500 hover:bg-indigo-600",
      blue: "bg-blue-500 hover:bg-blue-600",
      gray: "bg-gray-500 hover:bg-gray-600",
      green: "bg-green-500 hover:bg-green-600",
    };
    return (
      <button
        onClick={onClick}
        title={title}
        className={`p-1.5 rounded-full text-white transition ${colorMap[color]}`}
      >
        <Icon className="w-4 h-4" />
      </button>
    );
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Liste des examens</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition"
        >
          <PlusCircle className="w-4 h-4" /> Ajouter
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {[{ label: "En cours", key: "en cours", col: "yellow" },
          { label: "Terminé", key: "terminé", col: "green" },
          { label: "En attente", key: "en attente", col: "red" }
        ].map(({ label, key, col }) => (
          <button
            key={key}
            onClick={() => setSelectedStatus(key)}
            className={`px-3 py-1 text-sm text-white bg-${col}-500 rounded hover:bg-${col}-600 transition`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => setSelectedStatus("")}
          className="px-3 py-1 text-sm text-white bg-gray-500 rounded hover:bg-gray-600 transition"
        >
          Tout afficher
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left text-gray-600">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Type</th>
                <th className="p-3">Médecin</th>
                <th className="p-3">Technicien</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Statut</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((exam) => (
                <tr key={exam._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-black">{exam.patientName}</td>
                  <td className="p-3 text-red-600">{exam.examType}</td>
                  <td className="p-3 text-green-600">{exam.doctor}</td>
                  <td className="p-3 text-blue-600">{exam.technician}</td>
                  <td className="p-3 text-black">{new Date(exam.date).toLocaleDateString()}</td>
                  <td className="p-3 text-center">{getStatusBadge(exam.status)}</td>
                  <td className="p-3 text-center flex gap-2 justify-center">
                    {exam.status !== ExamStatus.TERMINE && (
                      <ActionButton
                        onClick={() => updateExamStatus(exam._id, getNextStatus(exam.status))}
                        icon={Repeat2}
                        color="indigo"
                        title="Changer le statut"
                      />
                    )}
                    {exam.status === ExamStatus.TERMINE && (
                      <>
                        {!resultsUploaded[exam._id] ? (
                          <ActionButton
                            onClick={() => handleResultsUpload(exam._id)}
                            icon={UploadCloud}
                            color="blue"
                            title="Uploader résultats"
                          />
                        ) : (
                          <ActionButton
                            onClick={() => handleHideResults(exam._id)}
                            icon={EyeOff}
                            color="gray"
                            title="Masquer résultats"
                          />
                        )}
                        <ActionButton
                          onClick={() => handleSendResults(exam._id)}
                          icon={Send}
                          color="green"
                          title="Envoyer résultats"
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Nouvelle demande d&apos;examen
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <NewExamForm onClose={() => setShowModal(false)} onSubmit={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
}
