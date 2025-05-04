// app/api/posts/[id]/chat-history/route.ts
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

import { auth } from "@/auth";
// import { db } from "@/lib/db";

// export async function GET(_: Request, { params }: { params: { id: string } }) {
//   const session = await auth();
//   if (!session?.user?.id) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const messages = await db.chatMessage.findMany({
//     where: {
//       postId: params.id,
//       userId: session.user.id,
//     },
//     orderBy: { createdAt: "asc" },
//     select: { role: true, content: true },
//   });

//   return Response.json(messages);
// }


import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || !session.user?.email) return NextResponse.json([], { status: 401 });

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return NextResponse.json([], { status: 404 });

  const chat = await db.chat.findFirst({
    where: { userId: user.id, postId: params.id },
  });

  return NextResponse.json(chat?.messages || []);
}
