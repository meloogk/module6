"use client"

import { useState } from "react";
import Navbar from "./components/navbar";
import Stats from "./components/stats";
import ExamList from "./components/examlist";
import NewExamForm from "./components/newexamform";

export default function Home() {
  const [showNewExamForm, setShowNewExamForm] = useState(false);

  const handleNewExamSubmit = (exam: any) => {
    console.log("Nouvel examen ajouté :", exam);
    setShowNewExamForm(false); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Stats />
        <ExamList onNewExam={() => setShowNewExamForm(true)} />
        
        {/* Ajout d'un nouveau examen */}
        {showNewExamForm && (
          <NewExamForm 
            onClose={() => setShowNewExamForm(false)} 
            onSubmit={handleNewExamSubmit} 
          />
        )}
      </main>
    </div>
  );
}
