// "use client";

// import { useState } from "react";

// export default function PostChat({ postId }: { postId: string }) {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");

//   async function handleChat() {
//     const res = await fetch("/api/chat", {
//       method: "POST",
//       body: JSON.stringify({ postId, question }),
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await res.json();
//     setAnswer(data.answer);
//   }

//   return (
//     <div className="mt-4">
//       <textarea
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         placeholder="Ask a question about this post..."
//         className="w-full p-2 border"
//       />
//       <button onClick={handleChat} className="mt-2 px-4 py-2 bg-green-600 text-white">
//         Ask Gemini
//       </button>

//       {answer && (
//         <div className="mt-4 p-4 bg-gray-100 border rounded">
//           <strong>Gemini:</strong>
//           <p>{answer}</p>
//         </div>
//       )}
//     </div>
//   );
// }
