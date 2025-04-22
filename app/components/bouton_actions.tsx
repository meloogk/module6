import { LucideIcon } from "lucide-react";

type ActionButtonProps = {
  readonly onClick: () => void;
  readonly icon: LucideIcon;
  readonly color: "indigo" | "blue" | "gray" | "green";
  readonly title: string;
};

export default function ActionButton({
  onClick,
  icon: Icon,
  color,
  title,
}: ActionButtonProps) {
  const colorMap: Record<ActionButtonProps["color"], string> = {
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
}
