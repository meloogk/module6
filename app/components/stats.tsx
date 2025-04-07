"use client";
import { useEffect, useState } from "react";
import { Users, ClipboardList, Activity, Hourglass } from "lucide-react"; 

const statsConfig = [
  { icon: Users, label: "Patients du Jour", key: "patientsToday" },
  { icon: ClipboardList, label: "Examens en Cours", key: "examsInProgress" },
  { icon: Activity, label: "Examens Terminés", key: "examsCompleted" },
  { icon: Hourglass, label: "Examens en Attente", key: "examsPending" }, 
];

export default function Stats() {
  const [stats, setStats] = useState({
    patientsToday: 0,
    examsInProgress: 0,
    examsCompleted: 0,
    examsPending: 0, 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/statistiques");
        if (!response.ok) throw new Error("Erreur serveur");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"> {/* Passer à 4 colonnes pour afficher 4 statistiques */}
      {loading ? (
        <div className="col-span-4 text-center py-12">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-solid rounded-full border-indigo-600 border-t-transparent" />
          <p className="text-gray-500 mt-4">Chargement des statistiques...</p>
        </div>
      ) : (
        statsConfig.map(({ icon: Icon, label, key }) => (
          <div key={key} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Icon className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats[key as keyof typeof stats]}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
