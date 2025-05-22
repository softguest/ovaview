'use client';

import { useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

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

  const goToProfile = (profileId: string) => {
    router.push(`/user-profile/${profileId}`);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 p-4">
      {subjects.map((subject) => {
        const isSubscribed = subject.subscriptions && subject.subscriptions.length > 0;

        return (
          <Card key={subject.id} className="border rounded-md">
            <div className="flex justify-between items-center">
              <div className="w-full transition">
                <Link href={`/subjects/${subject.id}`}>
                  <div className="relative bg-white shadow-lg w-full h-48 overflow-hidden">
                    <Image src={subject?.image ?? "/course/subject.jpg"} alt="subjectTitle" fill className="object-cover rounded-md" />
                  </div>
                </Link>
                <div className="p-2">
                  <h2 className="text-xl font-medium mt-3">
                    {subject.title.slice(0, 30)}...
                  </h2>
                  <div className="prose max-w-none">{subject?.searchText}</div>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />

                  <div className="flex items-center justify-between mt-2">
                    <Button  
                      className="text-sm bg-slate-50 px-2 rounded-sm text-gray-600 font-bold"
                      onClick={() => goToProfile(subject.authorId)} style={{ cursor: 'pointer'}}
                    >
                      {subject.author.firstName} {subject.author.lastName} 
                    </Button>
                    <div className="rounded-full">
                        <div className="w-full h-full flex justify-center items-center bg-slate-500 text-center text-white rounded-full font-bold">
                          <div className="flex items-center space-x-2">
                            {subject?.author?.profileImage ? (
                              <div className="relative rounded-full w-10 h-10 overflow-hidden">
                                <Image
                                  src={subject.author.profileImage}
                                  alt="User"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-2 h-4 bg-slate-500 p-5 text-white flex items-center justify-center rounded-full font-bold">
                                {subject?.author?.firstName
                                  ?.split(" ")
                                  ?.slice(0, 1)
                                  ?.map((word: string) => word.charAt(0).toUpperCase())
                                  ?.join("")}
                              </div>
                            )}
                          </div>
                        </div>
                    </div>
                  </div>

                  <hr className="mt-2 text-slate-50"/>

                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-blue-600">
                      {subject._count.subscriptions} subscriber
                      {subject._count.subscriptions !== 1 && "s"}
                    </div>

                    {!isSubscribed ? (
                      <button
                        disabled={isPending}
                        onClick={() => handleSubscribe(subject.id)}
                        className="text-sm border border-red-600 hover:bg-red-700 text-red-600 hover:text-white px-3 py-1 rounded transition-colors duration-200"
                      >
                        {isPending ? "Subscribing..." : "Subscribe"}
                      </button>
                    ) : (
                      <button
                        disabled={isPending}
                        onClick={() => goToPost(subject.id)}
                        style={{ cursor: 'pointer' }}
                        className="text-sm border border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white px-3 py-1 rounded transition-colors duration-200"
                      >
                        {isPending ? "Loading..." : "Start Learning"}
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
