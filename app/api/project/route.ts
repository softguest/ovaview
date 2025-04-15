import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = await currentUser();

    try{
        if(!user?.email) {
            return NextResponse.json({message: "Not Authenticated"}, { status: 401 })
        }
        const {
            challengeId,
            title,
            description,
            github,
            image,
            } = await req.json();
        
        const newProject = await db.project.create({
            data: {
                challengeId, 
                title,
                description,
                github,
                image,
                authorId: user.id, 
            }
        })
        return NextResponse.json({newProject}, {status: 200})
    } catch (err) {
        return NextResponse.json({ message: 'Something when wrong'}, { status: 500})
    }
}