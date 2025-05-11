'use client';

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {
  posts: any[];
  sessionUserId: string | null;
};

const PostList = ({ posts, sessionUserId }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const goToPost = (postId: string) => {
    router.push(`/posts/${postId}`);
  };

  const handleSubscribe = async (postId: string) => {
    startTransition(async () => {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
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
      {posts.map((post) => {
        const isSubscribed = post.subscriptions && post.subscriptions.length > 0;

        return (
          <Card key={post.id} className="p-4 border rounded">
            <div className="flex justify-between items-center">
              <div className="w-full transition">
                <Link href={`/posts/${post.id}`}>
                  <div className="relative bg-white shadow-lg w-full h-48 overflow-hidden">
                    {post.image ? (
                      <Image src={post.image} alt="subjectTitle" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex justify-center items-center bg-slate-400 text-2xl text-center text-white font-bold">
                        <h1 className="text-x8 font-semibold">
                          {post.title
                            .split(" ")
                            .slice(0, 3)
                            .map((word: string) => word.charAt(0).toUpperCase())
                            .join(" ")}
                        </h1>
                      </div>
                    )}
                  </div>
                </Link>
                <h2 className="text-xl font-medium mt-3">
                  {post.title.slice(0, 30)}...
                </h2>
                <p className="text-slate-400 text-sm font-medium mt-3">
                  {post.content.slice(0, 80)} ...
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm text-gray-600 font-bold">
                    {post.author.firstName} {post.author.lastName} 
                  </div>
                  <div className="p-2 rounded-full">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt="subjectTitle"
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex justify-center items-center py-2 px-4 bg-slate-500 text-center text-white rounded-full font-bold">
                        <h1 className="text-x1 font-semibold">
                          {post?.author?.firstName
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
                    {post._count.subscriptions} subscriber
                    {post._count.subscriptions !== 1 && "s"}
                  </div>

                  {!isSubscribed ? (
                    <button
                      disabled={isPending}
                      onClick={() => handleSubscribe(post.id)}
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      {isPending ? "Subscribing..." : "Subscribe"}
                    </button>
                  ) : (
                    <button
                      disabled={isPending}
                      onClick={() => goToPost(post.id)} style={{ cursor: 'pointer' }}
                      className="text-sm bg-slate-600 hover:bg-slate-700 text-white px-3 py-1 rounded"
                    >
                      {isPending ? "Loaging..." : "Subscribed"}
                    </button>
                  )}
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
