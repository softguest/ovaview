
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

  const subjects = await db.subject.findMany({
    where: { author: { email: session.user.email! } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Subjects</h1>
        <Link
          href="/dashboard/writer/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Subject
        </Link>
      </div>

      <ul className="space-y-4">
        {subjects.map((subject) => (
          <li key={subject.id}>
            <Card className="p-4 border rounded">
              <div className="flex justify-between items-center">
                <Link href={`/subjects/${subject.id}`} className="flex space-x-4">
                  <Image
                    src={subject?.image ?? "/course/subject.jpg"}
                    alt="Post image"
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-medium">{subject.title}</h2>
                    <p className="text-sm text-gray-600">
                      {new Date(subject.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
                <Link
                  href={`/dashboard/writer/edit/${subject.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </Card>
          </li>

        ))}
      </ul>
    </div>
  );
}
