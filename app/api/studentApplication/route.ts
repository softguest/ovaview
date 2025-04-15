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
            registrationId,
            provideFullNamesAsProvidedOnYourCertificate,
            graduateType,
            programmeOfStudy,
            admissionYear,
            graduationOrLastStudyYear,
            thesisTopic,
            className  
            } = await req.json();
        
        const newStudentApplication = await db.studentApplication.create({

            data: {
                authorId: user.id, 
                registrationId,
                provideFullNamesAsProvidedOnYourCertificate,                   
                graduateType,
                programmeOfStudy,
                admissionYear,
                graduationOrLastStudyYear,
                thesisTopic, 
                className
            }
        })
        return NextResponse.json({newStudentApplication}, {status: 200})
    } catch (err) {
        return NextResponse.json({ message: 'Something when wrong'}, { status: 500})
    }
}


export async function GET(req: Request) {
    const user = await currentUser();

    try{
        if(!user?.email) {
            return NextResponse.json({message: "Not Authenticated"}, { status: 401 })
        }
        const newStudentApplication = await db.studentApplication.findMany({
            where: {
                authorId: user?.id
            },
            include: {
                author: true,
                registration: true,
            }
        })
        return NextResponse.json({newStudentApplication}, {status: 200})
    } catch (err) {
        return NextResponse.json({ message: 'Something when wrong'}, { status: 500})
    }
}