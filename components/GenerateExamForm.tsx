"use client";
import { useState } from "react";

interface GenerateExamFormProps {
  onStart: (exam: any) => void;
}

export function GenerateExamForm({ onStart }: GenerateExamFormProps) {
  const [topic, setTopic] = useState("");
  const [num, setNum] = useState(5);
  const [loading, setLoading] = useState(false); // ✅ Add loading state

  async function handle() {
    if (!topic.trim()) {
      alert("Please enter a topic!");
      return;
    }

    setLoading(true); // Start loading

    try {
      const exam = await fetch("/api/exams/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, numQuestions: num }),
      }).then(r => r.json());

      if (onStart) {
        onStart(exam);
      }
    } catch (error) {
      console.error("Failed to generate exam:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading no matter what
    }
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md flex space-x-2">
      <input
        className="border p-2 rounded flex-1"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        className="border p-2 rounded w-16"
        type="number"
        min={1}
        value={num}
        onChange={(e) => setNum(+e.target.value)}
      />
      <button
        className="px-4 py-2 flex items-center justify-center bg-blue-600 text-white rounded-2xl shadow hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handle}
        disabled={!topic.trim() || loading}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
            <span>Generating...</span>
          </div>
        ) : (
          "Generate"
        )}
      </button>
    </div>
  );
}
