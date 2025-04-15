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
            schoolId,
            title,
            description,
            startYear,
            endYear,
            } = await req.json();
        
        const newRegistration = await db.registration.create({
            data: {
                schoolId, 
                description,
                startYear,
                endYear,
                title,
                authorId: user.id, 
            }
        })
        return NextResponse.json({newRegistration}, {status: 200})
    } catch (err) {
        return NextResponse.json({ message: 'Something when wrong'}, { status: 500})
    }
}