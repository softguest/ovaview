import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { auth } from "@/auth"; // <-- Import auth

// GET - Fetch a post only if the user has subscribed
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const postId = params.id;

  // Check subscription
  const subscription = await db.subscription.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (!subscription) {
    return NextResponse.json({ error: "You must subscribe to view this post." }, { status: 403 });
  }

  const post = await db.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

// PUT - Update a post
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const file = formData.get("file") as File | null;

  const post = await db.post.findUnique({
    where: { id: params.id },
    include: {
      author: true,
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  let newImageUrl = post.image;

  // Handle image upload
  if (file && file.name) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${uuidv4()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    newImageUrl = `/uploads/${fileName}`;

    // Delete old image
    if (post.image) {
      const oldImagePath = path.join(process.cwd(), "public", post.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
  }

  const updatedPost = await db.post.update({
    where: { id: params.id },
    data: {
      title,
      content,
      image: newImageUrl,
    },
  });

  return NextResponse.json(updatedPost);
}
