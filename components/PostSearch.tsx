"use client";

import { useState } from "react";

export default function SubjectSearch() {
  const [query, setQuery] = useState("");
  const [subjects, setSubjects] = useState([]);

  async function handleSearch() {
    const res = await fetch(`/api/subjects/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setSubjects(data);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search Subjects..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-600 text-white">
        Search
      </button>

      <ul>
        {subjects.map((subject: any) => (
          <li key={subject.id}>{subject.title}</li>
        ))}
      </ul>
    </div>
  );
}
