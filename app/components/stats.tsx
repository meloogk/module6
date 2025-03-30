import { Users, ClipboardList, Activity } from "lucide-react";

export default function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { icon: Users, label: "Patients du Jour", value: 24 },
        { icon: ClipboardList, label: "Examens en Cours", value: 12 },
        { icon: Activity, label: "Examens Terminés", value: 45 },
      ].map(({ icon: Icon, label, value }, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Icon className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
