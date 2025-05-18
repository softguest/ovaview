// /api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { subjectId } = await req.json();

  await db.subscription.create({
    data: {
      userId: session.user.id,
      subjectId,
    },
  });

  return NextResponse.json({ message: "Subscribed successfully" });
}
