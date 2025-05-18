"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { EditorRenderer } from "@/components/EditorRenderer";
import type { EditorContent } from "@/types/editor";

type Subject = {
  id: string;
  title: string;
  content: string;
  image: string;
};

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function SubjectDetailPage() {
  const { id } = useParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [similarSubjects, setSimilarSubjects] = useState<{ id: string; title: string }[]>([]);
  const [activeDiv, setActiveDiv] = useState(1);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [loading, setLoading] = useState(true); // ⬅️ loading state

  // Check subscription on load
  
  useEffect(() => {
  const loadAllData = async () => {
    try {
      // Check subscription
      const subRes = await fetch(`/api/subjects/${id}/is-subscribed`);
      const subData = await subRes.json();
      setSubscribed(subData.subscribed);

      if (!subData.subscribed) return; // Don't fetch subject/chat/similar if not subscribed

      // Fetch all content
      const [subjectRes, chatRes, similarRes] = await Promise.all([
        fetch(`/api/subjects/${id}`),
        fetch(`/api/subjects/${id}/chat-history`),
        fetch(`/api/subjects/${id}/similar`)
      ]);

      const subjectData = await subjectRes.json();
      const chatData = await chatRes.json();
      const similarData = await similarRes.json();

      setSubject(subjectData);
      setMessages(chatData);
      setSimilarSubjects(similarData);
    } catch (err) {
      console.error("Failed to load subject detail:", err);
    } finally {
      setLoading(false); // ✅ Stop loading only after everything finishes
    }
  };

  loadAllData();
}, [id]);


  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    const newMessages: Message[] = [...messages, newMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch(`/api/subjects/${id}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Failed to get reply from AI.");

      const { reply } = await res.json();
      const aiMessage: Message = { role: "ai", content: reply };
      setMessages([...newMessages, aiMessage]);

    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  const handleSubscribe = async () => {
    setSubscribing(true);
    try {
      const res = await fetch(`/api/subjects/${id}/subscribe`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSubscribed(true);
      } else {
        alert(data.error || "Subscription failed");
      }
    } catch (err) {
      alert("An error occurred while subscribing.");
    } finally {
      setSubscribing(false);
    }
  };

  // const content = typeof subject.content === "string" ? JSON.parse(subject.content) : subject.content;

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  // Render for unsubscribed users
  if (!subscribed) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">This subject is for subscribers only.</h1>
        <Button onClick={handleSubscribe} disabled={subscribing}>
          {subscribing ? "Subscribing..." : "Subscribe to View"}
        </Button>
      </div>
    );
  }

  let editorBlocks: EditorContent["blocks"] = [];

  if (subject?.content) {
    try {
      const parsed: EditorContent = typeof subject.content === "string"
        ? JSON.parse(subject.content)
        : subject.content;
      editorBlocks = parsed.blocks;
    } catch (error) {
      console.error("Failed to parse subject content:", error);
    }
  }



  return (
    <div className={`transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
      <div className="max-w-8xl mx-auto p-6 space-y-6">
        <div className="flex justify-between gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded w-full ${activeDiv === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveDiv(1)}
          >
            Subject Content
          </button>
          <button
            className={`px-4 py-2 rounded w-full ${activeDiv === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveDiv(2)}
          >
            Ask Any Question
          </button>
          <button
            className={`px-4 py-2 rounded w-full ${activeDiv === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveDiv(3)}
          >
            Similar Subjects
          </button>
        </div>

        {/* Tabs Content */}
        <div>
          {activeDiv === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{subject?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {subject?.image && <img src={subject.image} className="w-full mb-4" />}
                <EditorRenderer blocks={editorBlocks} />
              </CardContent>
            </Card>
          )}

          {activeDiv === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Ask about this subject</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-md ${
                        msg.role === "user"
                          ? "bg-blue-100 text-blue-900 ml-auto max-w-[75%]"
                          : "bg-gray-100 text-gray-800 mr-auto max-w-[75%]"
                      }`}
                    >
                      {msg.content}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about the Subject..."
                    className="flex-grow"
                  />
                  <Button onClick={handleSend}>Send</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeDiv === 3 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Similar Subjects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {similarSubjects.length === 0 ? (
                  <p className="text-muted-foreground">No similar Subjects found.</p>
                ) : (
                  similarSubjects.map((subject) => (
                    <a
                      key={subject.id}
                      href={`/subjects/${subject.id}`}
                      className="block p-2 rounded hover:bg-muted text-blue-600"
                    >
                      {subject.title}
                    </a>
                  ))
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>  
  );
}
