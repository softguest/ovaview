// import { NextResponse } from "next/server";
// import {db} from "@/lib/db";
// import { postSchema } from "@/schemas/postSchema";
// import { auth } from "@/auth";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const post = await db.post.findUnique({
//     where: { id: params.id },
//     include: {
//         author: true,
//     },
//   });

//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   return NextResponse.json(post);
// }

// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await auth();

//   if (!session || session.user.role !== "WRITER") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const post = await db.post.findUnique({
//     where: { id: params.id },
//   });

//   // if (!post || post.author.email !== session.user.email) {
//   //   return NextResponse.json({ error: "Not allowed" }, { status: 403 });
//   // }

//   const body = await req.json();
//   const result = postSchema.safeParse(body);

//   if (!result.success) {
//     return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
//   }

//   const { title, content } = result.data;

//   const updatedPost = await db.post.update({
//     where: { id: params.id },
//     data: { title, content },
//   });

//   return NextResponse.json(updatedPost);
// }


import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import {db} from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const post = await db.post.findUnique({
    where: { id: params.id },
    include: {
      author: true,
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const file = formData.get("file") as File | null;

  // const post = await db.post.findUnique({ where: { id: params.id } });

  const post = await db.post.findUnique({
    where: { id: params.id },
    include: {
        author: true,
    },
  });

  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  let newImageUrl = post.image;

  // If a new file was uploaded, replace the old one
  if (file && file.name) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${uuidv4()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    newImageUrl = `/uploads/${fileName}`;

    // Delete the old image if it exists
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
