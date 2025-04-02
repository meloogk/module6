import { useState } from "react";
import { Loader, X } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function NewExamForm({ onClose }: Props) {
  const [formData, setFormData] = useState({
    patientName: "",
    examType: "",
    doctor: "",
    technician: "",
    date: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/ajouter_demande_examen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Échec de l'ajout");

      alert("✅ Examen ajouté avec succès !");
      onClose();
    } catch (error) {
      alert("❌ Erreur lors de l'ajout !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["patientName", "examType", "doctor", "technician"].map((field) => (
        <div key={field}>
          <label className="block text-blue-600 font-semibold">{field.replace(/([A-Z])/g, " $1")}</label>
          <input 
            type="text" 
            name={field} 
            value={formData[field]} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-lg focus:ring text-black focus:ring-blue-400" 
            required 
          />
        </div>
      ))}
      <div>
        <label className="block text-blue-600 font-semibold">Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring text-black focus:ring-blue-400" required />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center" onClick={onClose}>
          <X className="w-4 h-4 mr-1" /> Annuler
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
          {loading ? <Loader className="w-4 h-4 animate-spin mr-1" /> : "Ajouter"}
        </button>
      </div>
    </form>
  );
}
