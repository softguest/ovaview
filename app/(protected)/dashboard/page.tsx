import { auth } from "@/auth";
import { db } from "@/lib/db";
import PostList from "@/components/postList/PostList";

const Dashboard = async () => {
  const session = await auth();

  const subjects = await db.subject.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      _count: {
        select: { subscriptions: true },
      },
      subscriptions: session?.user?.id
        ? {
            where: { userId: session.user.id },
            select: { id: true },
          }
        : false,
    },
  });

  return <PostList subjects={subjects} sessionUserId={session?.user?.id || null} />;
};

export default Dashboard;
