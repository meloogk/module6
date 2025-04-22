'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FilePreviewProps {
  readonly file: File | null;
  readonly onRemove: () => void;
  readonly onReplace: () => void;
}

export default function FilePreview({ file, onRemove, onReplace }: FilePreviewProps) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setUrl(null);
    }
  }, [file]);

  if (!file || !url) return null;

  const isImage = file.type.startsWith("image/");

  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-700">Aperçu :</h3>
        <div className="space-x-2">
          <button
            onClick={onReplace}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Changer
          </button>
          <button
            onClick={onRemove}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Supprimer
          </button>
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
        {isImage ? (
          <div className="relative w-full max-w-sm h-64 mx-auto">
            <Image
              src={url}
              alt="Aperçu du fichier"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded"
              unoptimized
            />
          </div>
        ) : (
          <div className="text-gray-600">
            <p>Fichier sélectionné : <strong>{file.name}</strong></p>
            <p className="text-sm text-gray-500">Type : {file.type}</p>
            <p className="text-sm text-gray-500">Taille : {(file.size / 1024).toFixed(2)} Ko</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
