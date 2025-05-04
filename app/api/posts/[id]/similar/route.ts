import { db } from "@/lib/db";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const currentPost = await db.post.findUnique({ where: { id: params.id } });
  if (!currentPost) return new Response("Not found", { status: 404 });

  const similar = await db.post.findMany({
    where: {
      id: { not: params.id },
      title: { contains: currentPost.title.split(" ")[0], mode: "insensitive" }, // basic similarity
    },
    take: 3,
    select: { id: true, title: true },
  });

  return Response.json(similar);
}
