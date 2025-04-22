import { X, AlertCircle, Check } from "lucide-react";

interface ConfirmModalProps {
  readonly title?: string;
  readonly message: string;
  readonly onConfirm: () => Promise<void> | void;  
  readonly onCancel: () => void;  
}

export default function ConfirmModal({
  title = "Confirmation",
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-red-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-start space-x-3">
          <AlertCircle className="text-yellow-500 mt-1" />
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
          >
            <Check className="w-4 h-4 mr-1" />
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
