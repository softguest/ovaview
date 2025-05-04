import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const gemini = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Define a message format similar to OpenAI
type Message = {
    role: "user" | "ai";
    content: string;
  };

//#########################################################################################################

export async function getGeminiResponse(context: string, question: string) {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GOOGLE_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: `Context: ${context}` },
            { text: `Question: ${question}` }
          ]
        }]
      })
    });
  
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No answer';
  }
  

// lib/gemini.ts
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function getGeminiCompletion(
  context: string,
  messages: { role: "user" | "ai"; content: string }[]
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const formatted = messages.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({
    history: formatted,
    generationConfig: {
      temperature: 0.7,
    },
  });

  const result = await chat.sendMessage(context);
  const response = await result.response;
  return response.text();
}

// This function sends chat messages with the post content as context
export async function GeminiChat(messages: Message[], context: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
    // Create a system-level preamble using the post content
    const prompt = `You are an assistant answering questions based ONLY on the post content below:\n\n"${context}"`;
  
    const chatMessages = [
      { role: "user", parts: [{ text: prompt }] },
      ...messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    ];
  
    try {
      const result = await model.generateContent({ contents: chatMessages });
      const response = result.response;
      const text = response.text();
  
      return text.trim();
    } catch (error) {
      console.error("Gemini error:", error);
      return "Sorry, I couldn't generate a reply.";
    }
  }
