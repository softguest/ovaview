"use client";

import { useState } from "react";

export default function PostSearch() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);

  async function handleSearch() {
    const res = await fetch(`/api/posts/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setPosts(data);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-600 text-white">
        Search
      </button>

      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
