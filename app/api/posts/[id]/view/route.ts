// /app/api/posts/[id]/view/route.ts

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  const postId = params.id;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscription = await db.subscription.findFirst({
    where: {
      userId: session.user.id,
      postId: postId,
    },
  });

  if (!subscription) {
    return NextResponse.json({ error: "You are not subscribed to this post" }, { status: 403 });
  }

  const post = await db.post.findUnique({
    where: { id: postId },
  });

  return NextResponse.json(post);
}
