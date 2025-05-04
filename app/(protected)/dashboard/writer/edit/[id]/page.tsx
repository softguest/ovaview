// 'use client';

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";

// export default function EditPostPage() {
//   const { id } = useParams();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     fetch(`/api/posts/${id}`)
//       .then(function (res) {
//               return res.json();
//           })
//       .then(data => {
//         setTitle(data.title);
//         setContent(data.content);
//       });
//   }, [id]);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     const res = await fetch(`/api/posts/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({ title, content }),
//     });

//     if (res.ok) {
//       router.push("/dashboard/writer");
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           className="w-full border p-2 rounded"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           className="w-full border p-2 rounded h-40"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.imageUrl);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("file", image);
    }

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      router.push("/dashboard/writer");
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          required
        />
        <textarea
          className="w-full border p-2 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content..."
          required
        />
        {imageUrl && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Image:</p>
            <img src={imageUrl} alt="Current Post" className="w-full max-h-60 object-contain rounded border" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="block"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

