"use client";
import { useState } from "react";

interface NewExamFormProps {
  readonly onClose: () => void;
  readonly onSubmit: (exam: {
    patientName: string;
    examType: string;
    doctor: string;
    technician?: string;
    date: Date;
    status: "pending" | "in_progress" | "completed";
  }) => void;
}

export default function NewExamForm({ onClose, onSubmit }: NewExamFormProps) {
  const [formData, setFormData] = useState({
    patientName: "",
    examType: "",
    doctor: "",
    technician: "",
    date: new Date().toISOString().slice(0, 10),
    status: "pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      patientName: formData.patientName,
      examType: formData.examType,
      doctor: formData.doctor,
      technician: formData.technician || undefined,
      date: new Date(formData.date),
      status: formData.status as "pending" | "in_progress" | "completed",
    });
    onClose(); // Ferme le formulaire après soumission
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Nouvel Examen</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Nom du patient"
            required
            className="w-full border rounded-lg px-3 py-2 text-blue-500"
          />
          <input
            type="text"
            name="examType"
            value={formData.examType}
            onChange={handleChange}
            placeholder="Type d'examen"
            required
            className="w-full border rounded-lg px-3 py-2  text-blue-500"
          />
          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            placeholder="Médecin"
            required
            className="w-full border rounded-lg px-3 py-2  text-blue-500"
          />
          <input
            type="text"
            name="technician"
            value={formData.technician}
            onChange={handleChange}
            placeholder="Technicien (optionnel)"
            className="w-full border rounded-lg px-3 py-2  text-blue-500"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2  text-blue-500"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2  text-blue-500"
          >
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminé</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-black rounded-lg">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
