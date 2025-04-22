import { useRef, useState } from "react";
import FilePreview from "./visualisation_fichiers";
import ConfirmModal from "./bouton_confirmation";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReplaceFile = () => {
    fileInputRef.current?.click();
  };

  const handleSendFile = async () => {
    if (!file) return;

    setIsSending(true);

    // Simulation de l’envoi
    setTimeout(() => {
      console.log("Fichier envoyé:", file);
      setIsSending(false);
      setShowModal(false);
      handleRemoveFile();
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="mb-6">
        <label htmlFor="file-input" className="block text-gray-700 font-semibold text-lg mb-2">
          Télécharger les résultats d&apos;analyse
        </label>
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            id="file-input"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" // Tu peux adapter ici
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg focus:outline-none hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            {file ? "Remplacer le fichier" : "Choisir un fichier"}
          </button>
        </div>
      </div>

      {file && (
        <>
          <div className="mb-6">
            <FilePreview file={file} onRemove={handleRemoveFile} onReplace={handleReplaceFile} />
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200 ease-in-out"
            >
              Envoyer
            </button>
            <button
              onClick={handleRemoveFile}
              className="ml-4 px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg focus:outline-none transition duration-200 ease-in-out"
            >
              Supprimer
            </button>
          </div>
        </>
      )}

      {showModal && (
        <ConfirmModal
          title="Confirmation d'envoi"
          message="Êtes-vous sûr de vouloir envoyer ce fichier ?"
          onConfirm={handleSendFile}
          onCancel={() => setShowModal(false)}
        />
      )}

      {isSending && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600 mr-3"></div>
          <span className="text-gray-700 font-semibold">Envoi en cours...</span>
        </div>
      )}
    </div>
  );
}
