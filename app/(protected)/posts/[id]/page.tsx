"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type Post = {
  id: string;
  title: string;
  content: string;
  image: string;
};

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [similarPosts, setSimilarPosts] = useState<{ id: string; title: string }[]>([]);
  const [activeDiv, setActiveDiv] = useState(1);

  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  // Check subscription on load
  useEffect(() => {
    const checkSubscription = async () => {
      const res = await fetch(`/api/posts/${id}/is-subscribed`);
      const data = await res.json();
      setSubscribed(data.subscribed);
    };
    checkSubscription();
  }, [id]);


  // Load post + chat if subscribed
useEffect(() => {
  if (!subscribed) return;

  const loadData = async () => {
    try {
      const [postRes, chatRes, similarRes] = await Promise.all([
        fetch(`/api/posts/${id}`),
        fetch(`/api/posts/${id}/chat-history`),
        fetch(`/api/posts/${id}/similar`)
      ]);

      if (!postRes.ok || !chatRes.ok || !similarRes.ok) {
        console.error("One of the responses failed.");
        return;
      }

      const postData = await postRes.json();
      const chatData = await chatRes.json();
      const similarData = await similarRes.json();

      setPost(postData);
      setMessages(chatData); // Safe now due to backend filtering
      setSimilarPosts(similarData);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  loadData();
}, [id, subscribed]);


  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    const newMessages: Message[] = [...messages, newMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch(`/api/posts/${id}/chat`, {
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
      const res = await fetch(`/api/posts/${id}/subscribe`, { method: "POST" });
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

  // Render for unsubscribed users
  if (!subscribed) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">This post is for subscribers only.</h1>
        <Button onClick={handleSubscribe} disabled={subscribing}>
          {subscribing ? "Subscribing..." : "Subscribe to View"}
        </Button>
      </div>
    );
  }

  if (!post) return <div className="p-4 text-center">Loading post...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Tabs */}
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
        {activeDiv === 1 && <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {post.image && <img src={post.image} className="w-full mb-4" />}
            <div className="text-muted-foreground whitespace-pre-wrap">{post.content}</div>
          </CardContent>
        </Card>}

        {activeDiv === 2 && <Card>
          <CardHeader>
            <CardTitle>Ask about this post</CardTitle>
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
                placeholder="Ask a question about the post..."
                className="flex-grow"
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </CardContent>
        </Card>}

        {activeDiv === 3 && <Card className="mt-6">
          <CardHeader>
            <CardTitle>Similar Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {similarPosts.length === 0 ? (
              <p className="text-muted-foreground">No similar posts found.</p>
            ) : (
              similarPosts.map((post) => (
                <a
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="block p-2 rounded hover:bg-muted text-blue-600"
                >
                  {post.title}
                </a>
              ))
            )}
          </CardContent>
        </Card>}
      </div>
    </div>
  );
}
