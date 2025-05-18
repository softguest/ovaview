import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  const subjects = await db.subject.findMany({
  where: {
    OR: [
      { title: { contains: query, mode: "insensitive" } },
      { searchText: { contains: query, mode: "insensitive" } }
    ],
  },
  take: 20,
  orderBy: { createdAt: "desc" },
});


  return NextResponse.json(subjects);
}
