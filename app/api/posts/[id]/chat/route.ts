// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import { auth } from "@/auth";
// import { db } from "@/lib/db";
import { getGeminiCompletion } from "@/lib/gemini";

// export async function POST(req: Request, { params }: { params: { id: string } }) {
//   const session = await auth();
//   if (!session?.user?.id) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const { messages } = await req.json();
//   const post = await db.post.findUnique({ where: { id: params.id } });

//   if (!post) return new Response("Post not found", { status: 404 });

//   const context = `Answer based only on the following blog content:\n\n"${post.content}"`;

//   const reply = await getGeminiCompletion(context, messages);

//   const allMessages = [...messages, { role: "ai", content: reply }];

//   for (const msg of allMessages) {
//     await db.chatMessage.create({
//       data: {
//         userId: session.user.id,
//         postId: params.id,
//         role: msg.role,
//         content: msg.content,
//       },
//     });
//   }

//   return Response.json({ reply });
// }


import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { GeminiChat } from "@/lib/gemini"; // Your Gemini API handler

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || !session.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { messages } = await req.json();

  // Get post content (used as RAG context)
  const post = await db.post.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  // Generate reply using Gemini
  const reply = await GeminiChat(messages, post.content);

  // Save chat
  await db.chat.upsert({
    where: {
      userId_postId: { userId: user.id, postId: params.id },
    },
    create: {
      userId: user.id,
      postId: params.id,
      messages: [...messages, { role: "ai", content: reply }],
    },
    update: {
      messages: [...messages, { role: "ai", content: reply }],
    },
  });

  return NextResponse.json({ reply });
}


