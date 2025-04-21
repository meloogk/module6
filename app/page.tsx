"use client"
import { useState } from "react";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
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
        <Dashboard /> 
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