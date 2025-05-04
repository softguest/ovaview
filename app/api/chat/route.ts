// import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/lib/db';
// import { getGeminiResponse } from '@/lib/gemini';

// export async function POST(req: NextRequest) {
//   const { postId, question } = await req.json();

//   const post = await db.post.findUnique({
//     where: { id: postId },
//     select: { content: true },
//   });

//   if (!post) {
//     return NextResponse.json({ error: 'Post not found' }, { status: 404 });
//   }

//   const answer = await getGeminiResponse(post.content, question);
//   return NextResponse.json({ answer });
// }


import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const chatSchema = z.object({
  postId: z.string(),
  question: z.string().min(5),
});

export async function POST(req: Request) {
  const body = await req.json();
  const result = chatSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const { postId, question } = result.data;

  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GOOGLE_API_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        { role: "user", parts: [`Post Content: ${post.content}`] },
        { role: "user", parts: [`Question: ${question}`] },
      ],
    }),
  });

  const data = await geminiRes.json();
  const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer available.";

  return NextResponse.json({ answer });
}
