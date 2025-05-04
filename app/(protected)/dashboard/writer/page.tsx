
import { auth } from "@/auth";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function WriterDashboard() {

  const session = await auth();

  if (session?.user.role !== "WRITER") {
    return <div className="p-4">Access denied.</div>;
  }

  const posts = await db.post.findMany({
    where: { author: { email: session.user.email! } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Posts</h1>
        <Link
          href="/dashboard/writer/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Post
        </Link>
      </div>

      <ul className="space-y-4">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} className="my-1">
            <Card key={post.id} className="p-4 border rounded">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <img
                    src={post.image} 
                    className="w-[50px] h-[50px] object-cover"
                    alt="Post image"
                  />
                  <div>
                    <h2 className="text-xl font-medium">{post.title}</h2>
                    <p className="text-sm text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/dashboard/writer/edit/${post.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </Card>
          </Link>
        ))}
      </ul>
    </div>
  );
}
