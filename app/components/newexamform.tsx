import { useState, useEffect } from "react";
import { Loader, X, CheckCircle } from "lucide-react";

interface Props {
  onClose: () => void;
  onSubmit: (exam: {
    patientName: string;
    examType: string;
    doctor: string;
    technician: string;
    date: string;
    status: string;
  }) => void;
}

export default function NewExamForm({ onClose, onSubmit }: Readonly<Props>) {
  const [formData, setFormData] = useState({
    patientName: "",
    examType: "",
    doctor: "",
    technician: "",
    date: "",
    status: "En attente",
  });

  const [loading, setLoading] = useState(false);
  const [examTypes, setExamTypes] = useState<string[]>([]); // État pour les types d'examen
  const [error, setError] = useState<string>("");

  // Récupérer les types d'examen depuis l'API
  useEffect(() => {
    async function fetchExamTypes() {
      try {
        const response = await fetch("/api/types_analyses_medicales");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des types d'examen");
        }
        const data = await response.json();
        setExamTypes(data.data); // Assurez-vous que la structure correspond
      } catch (err) {
        setError("Erreur lors de la récupération des types d'examen");
      }
    }
    fetchExamTypes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const req = await fetch("/api/ajouter_demande_examen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const res = await req.json();

      if (res.message === "ok") {
        alert("Examen ajouté avec succès !");
        onSubmit(formData);  
        onClose();
      } else {
        console.log("Échec de l'ajout");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'examen :", error);
      alert("Erreur lors de l'ajout !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-semibold text-blue-700 text-center mb-4">
        Ajouter un Nouvel Examen
      </h2>

      {error && <div className="text-red-500 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Name */}
        <div>
          <label htmlFor="patientName" className="block text-gray-700 font-medium">
            Nom du Patient
          </label>
          <input
            id="patientName"
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Entrez le nom du patient"
            title="Nom du patient"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition text-gray-800"
            required
          />
        </div>

        {/* Exam Type */}
        <div>
          <label htmlFor="examType" className="block text-gray-700 font-medium">
            Type d&apos;examen
          </label>
          <select
            id="examType"
            name="examType"
            value={formData.examType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition text-gray-800"
            required
          >
            <option value="">Sélectionnez un type d&apos;examen</option>
            {examTypes.map((exam) => (
              <option key={exam} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor */}
        <div>
          <label htmlFor="doctor" className="block text-gray-700 font-medium">
            Médecin
          </label>
          <input
            id="doctor"
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            placeholder="Nom du médecin"
            title="Nom du médecin"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition text-gray-800"
            required
          />
        </div>

        {/* Technician */}
        <div>
          <label htmlFor="technician" className="block text-gray-700 font-medium">
            Technicien
          </label>
          <input
            id="technician"
            type="text"
            name="technician"
            value={formData.technician}
            onChange={handleChange}
            placeholder="Nom du technicien"
            title="Nom du technicien"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition text-gray-800"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium">
            Date de l&apos;examen
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            title="Date de l'examen"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition text-gray-800"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center transition"
            onClick={onClose}
          >
            <X className="w-4 h-4 mr-1" /> Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition"
          >
            {loading ? (
              <Loader className="w-4 h-4 animate-spin mr-1" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-1" />
            )}
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}
