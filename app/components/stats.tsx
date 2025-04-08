import { CheckCircle, Clock, Hourglass } from "lucide-react";

interface StatsProps {
  readonly exams: {
    status: string;
  }[];
  readonly onFilterChange: (status: string | null) => void;
  readonly activeFilter: string | null;
}

export default function Stats({ exams, onFilterChange, activeFilter }: StatsProps) {
  const getCount = (status: string | null) => {
    if (status) {
      return exams.filter((e) => e.status.toLowerCase() === status.toLowerCase()).length;
    }
    return exams.length; 
  };

  const statuses = [
    { label: "En attente", icon: <Hourglass className="text-red-500" />, color: "red-100" },
    { label: "En cours", icon: <Clock className="text-yellow-500" />, color: "yellow-100" },
    { label: "Terminé", icon: <CheckCircle className="text-green-500" />, color: "green-100" },
  ];
//fonction pour le filtre
  const toggleFilter = (status: string) => {
    if (activeFilter === status) {
      onFilterChange(null); 
    } else {
      onFilterChange(status); 
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Carte Nombre total de patients */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center border">
        <div>
          <p className="text-lg font-bold text-black">{getCount(null)}</p>
          <p className="text-sm text-gray-700">Nombre total de patients</p>
        </div>
      </div>

      {/* Cartes de statut */}
      {statuses.map(({ label, icon, color }) => (
        <button
          key={label}
          type="button" 
          className={`bg-${color} p-4 rounded-lg shadow-md flex justify-between items-center transition border ${
            activeFilter === label ? "ring-2 ring-blue-500" : ""
          }`}
          onClick={() => toggleFilter(label)}
        >
          <div>
            <p className="text-lg font-bold text-black">{getCount(label)}</p>
            <p className="text-sm text-gray-700">{label}</p>
          </div>
          {icon}
        </button>
      ))}
    </div>
  );
}
