import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = await currentUser();

    try{
        if(user?.role !== "ADMIN") {
            return NextResponse.json({message: "Sorry this is not a school account"}, { status: 401 })
        }
        const {title, description, image, challengeType, startDate, endDate, reward, Visibility } = await req.json();

        const newChallenge = await db.challenge.create({
            data: {
                authorId: user.id, title, description, image, challengeType, startDate, endDate, reward, Visibility
            }
        })
        return NextResponse.json({newChallenge}, {status: 200})
    } catch (err) {
        return NextResponse.json({ message: 'Something when wrong'}, { status: 500})
    }
}