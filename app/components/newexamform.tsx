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
  const [examTypes, setExamTypes] = useState<{ _id: string; name: string }[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchExamTypes() {
      try {
        const response = await fetch("/api/recuperer_types_analyses");
        if (!response.ok) throw new Error("Erreur lors de la récupération");

        const result = await response.json();

        if (Array.isArray(result.data)) {
          setExamTypes(result.data);
        } else {
          throw new Error("Format inattendu des types d'examen");
        }
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les types d'examen.");
      }
    }

    fetchExamTypes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.examType) {
      setError("Veuillez sélectionner un type d'examen.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ajouter_demande_examen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.message === "ok") {
        onSubmit(formData);
        onClose();
      } else {
        setError("Échec de l'ajout de l'examen.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau ou serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-semibold text-blue-700 text-center mb-4">
        Ajouter un Nouvel Examen
      </h2>

      {error && <div className="text-red-600 text-sm text-center mb-2">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom du patient */}
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
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Type d'examen */}
        <div>
          <label htmlFor="examType" className="block text-gray-700 font-medium">
            Type d&apos;examen
          </label>
          <select
            id="examType"
            name="examType"
            value={formData.examType}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300   text-black rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Sélectionnez un type --</option>
            {examTypes.map((exam) => (
              <option key={exam._id} value={exam.name}>{exam.name}</option>
            ))}
          </select>
        </div>

        {/* Médecin */}
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
            required
            className="w-full p-3 border border-gray-300 rounded-lg   text-black focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Technicien */}
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
            required
            className="w-full p-3 border border-gray-300   text-black rounded-lg focus:ring-2 focus:ring-blue-400"
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
            required
            className="w-full p-3 border border-gray-300  text-black  rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <X className="w-4 h-4 mr-1" /> Annuler
          </button>
          <button
            type="submit"
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            disabled={loading}
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
