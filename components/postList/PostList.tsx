'use client';

import { useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { renderEditorContent } from '@/lib/parseEditorContent';

type Props = {
  subjects: any[];
  sessionUserId: string | null;
};

const PostList = ({ subjects, sessionUserId }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [html, setHtml] = useState("");

  const goToPost = (subjectId: string) => {
    router.push(`/subjects/${subjectId}`);
  };

  const handleSubscribe = async (subjectId: string) => {
    startTransition(async () => {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjectId }),
      });

      if (res.ok) {
        router.refresh(); // Refresh the page to reflect new state
      } else {
        alert("Failed to subscribe");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 min-h-[80vh] gap-6 p-4">
      {subjects.map((subject) => {
        const isSubscribed = subject.subscriptions && subject.subscriptions.length > 0;

        return (
          <Card key={subject.id} className="border rounded-md">
            <div className="flex justify-between items-center">
              <div className="w-full transition">
                <Link href={`/subjects/${subject.id}`}>
                  <div className="relative bg-white shadow-lg w-full h-48 overflow-hidden">
                    {subject.image ? (
                      <Image src={subject.image} alt="subjectTitle" fill className="object-cover rounded-md" />
                    ) : (
                      <div className="w-full h-full flex justify-center items-center bg-slate-400 text-2xl text-center text-white font-bold">
                        <h1 className="text-x8 font-semibold">
                          {subject.title
                            .split(" ")
                            .slice(0, 3)
                            .map((word: string) => word.charAt(0).toUpperCase())
                            .join(" ")}
                        </h1>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-2">
                  <h2 className="text-xl font-medium mt-3">
                    {subject.title.slice(0, 30)}...
                  </h2>
                  {/* <p className="text-slate-400 text-sm font-medium mt-3">
                    {post.content.slice(0, 80)} ...
                  </p> */}
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: renderEditorContent(subject.content) }} />
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />

                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-gray-600 font-bold">
                      {subject.author.firstName} {subject.author.lastName} 
                    </div>
                    <div className="rounded-full">
                      {subject.image ? (
                        <Image
                          src={subject.image}
                          alt="subjectTitle"
                          width={40}
                          height={40}
                          className="w-[40px] h-[40px] object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full flex justify-center items-center py-2 px-4 bg-slate-500 text-center text-white rounded-full font-bold">
                          <h1 className="text-x1 font-semibold">
                            {subject?.author?.firstName
                              .split(" ")
                              .slice(0, 1)
                              .map((word: string) => word.charAt(0).toUpperCase())
                              .join(" ")}
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-blue-600">
                      {subject._count.subscriptions} subscriber
                      {subject._count.subscriptions !== 1 && "s"}
                    </div>

                    {!isSubscribed ? (
                      <button
                        disabled={isPending}
                        onClick={() => handleSubscribe(subject.id)}
                        className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        {isPending ? "Subscribing..." : "Subscribe"}
                      </button>
                    ) : (
                      <button
                        disabled={isPending}
                        onClick={() => goToPost(subject.id)} style={{ cursor: 'pointer' }}
                        className="text-sm bg-slate-600 hover:bg-slate-700 text-white px-3 py-1 rounded"
                      >
                        {isPending ? "Loaging..." : "Subscribed"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default PostList;
