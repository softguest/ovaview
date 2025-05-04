import { motion } from "framer-motion";
import SubjectCard from "@/components/subjectCard/SubjectCard";
import React from "react"
import { auth } from "@/auth";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import Image from "next/image";

const Dashboard = async () => {

  const session = await auth();
  
    const posts = await db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
      },
    });

  return ( 
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 min-h-[80vh] gap-6 p-4">
    {posts.map((post) => (
      <Link href={`/posts/${post.id}`} key={post.id}> {/* ✅ key moved here */}
        <Card className="p-4 border rounded">
          <div className="flex justify-between items-center">
            <div className="w-full transition">
              <div className="relative bg-white shadow-lg w-full h-48 overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt="subjectTitle"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center bg-slate-400 text-2xl text-center text-white font-bold">
                    <h1 className="text-x8 font-semibold">
                      {post.title
                        .split(' ')
                        .slice(0, 3)
                        .map(word => word.charAt(0).toUpperCase()) 
                        .join(' ')}
                    </h1>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-medium mt-3">{post.title.slice(0, 30)}...</h2>
              <p className="text-slate-400 text-sm font-medium mt-3">{post.content.slice(0, 80)} ...</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="p-2 rounded-full">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt="subjectTitle"
                      width={40}
                      height={40}
                      className="w-[50px] h-[50px] object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center py-2 px-4 bg-slate-500 text-center text-white rounded-full font-bold">
                      <h1 className="text-x1 font-semibold">
                        {post?.author?.firstName 
                          .split(' ')
                          .slice(0, 1)
                          .map(word => word.charAt(0).toUpperCase()) 
                          .join(' ')}
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    ))}

  </div>
  );
}

export default Dashboard;