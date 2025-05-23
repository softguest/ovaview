'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { OutputData } from "@editorjs/editorjs";

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<OutputData | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/subjects/${id}`);
        if (!res.ok) throw new Error("Failed to fetch subject");

        const data = await res.json();
        setTitle(data.title);
        setImageUrl(data.image);

        // Only setContent if it's still null
        setContent((prevContent) => {
          if (prevContent) return prevContent;
          return typeof data.content === "string" ? JSON.parse(data.content) : data.content;
        });
      } catch (error) {
        console.error("fetchPost error:", error);
      }
    };

    if (id && content === null) {
      fetchPost();
    }
  }, [id, content]);


  const handleEditorChange = (data: OutputData) => {
    setContent(data);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content) return alert("Content is required.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", JSON.stringify(content));
    if (image) {
      formData.append("file", image);
    }

    const res = await fetch(`/api/subjects/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      router.push("/dashboard/writer");
    } else {
      const err = await res.text();
      console.error("Update failed", err);
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Subject</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          required
        />

        {imageUrl && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Featured Image:</p>
            <img src={imageUrl} alt="Current Post" className="w-full max-h-60 object-contain rounded border" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="block"
        />

        {content ? (
          <Editor data={content} onChange={handleEditorChange} />
        ) : (
          <p className="text-sm text-gray-500">Loading editor...</p>
        )}

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
