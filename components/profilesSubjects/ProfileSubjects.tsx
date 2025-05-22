import { db } from '@/lib/db';
import Image from 'next/image';
import Logo from "@/assets/images/school-logo.png"
import Link from 'next/link';
import React, { FC } from 'react'
import { Card } from '../ui/card';
interface ProfileSubjectsProps {
        profileId: string 
  }

const ProfileSubjects: FC<ProfileSubjectsProps> = async ({ profileId }) => {
    const userSubjects = await db?.subject.findMany({
        where: {
            authorId: profileId,
        },
        include: {
            author: true,
        },
    });
  return (
    <div className=''>
        <h3 className='text-3xl font-bold mb-4'>
            Subjects Published By This Profile
        </h3>
        <hr className='my-4'/>
        <div className='grid grid-cols-1 gap-4'>
            <ul className="space-y-4">
                {userSubjects.map((subject) => (
                <li key={subject.id}>
                    <Card className="p-4 border rounded">
                    <div className="flex justify-between items-center">
                        <Link href={`/subjects/${subject.id}`} className="flex space-x-4">
                        <Image
                            src={subject?.image ?? "/course/subject.jpg"}
                            alt="Post image"
                            width={50}
                            height={50}
                            className="object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-medium">{subject.title}</h2>
                            <p className="text-sm text-gray-600">
                            {new Date(subject.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        </Link>
                        <Link
                        href={`/subjects/${subject.id}`}
                        className="text-blue-500 hover:underline"
                        >
                        Start learning
                        </Link>
                    </div>
                    </Card>
                </li>

                ))}
            </ul>
            
        </div>
    </div>
  )
}

export default ProfileSubjects