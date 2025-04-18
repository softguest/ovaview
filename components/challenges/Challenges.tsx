import { db } from '@/lib/db';
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { Challenge, User } from '@prisma/client';
import { FaPhoneVolume } from 'react-icons/fa'
import { currentRole } from '@/lib/auth';


const Challenges = async ({searchParams, }: {searchParams: {[key: string]: string |string[] | undefined }
}) => {

    const userRole = await currentRole();
     
    const schools = await db?.challenge.findMany({
        orderBy: {

            createdAt: 'desc',
        },
        include: {
            author: true,
        },
    });


    const page = searchParams['page'] ?? '1'
    const per_page = searchParams['per_page'] ?? '9'
    
    const start = (Number(page) - 1) * Number(per_page)
    const end = start + Number(per_page)

    const entries = schools.slice(start, end)

  return (
    <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 space-x-4 xl:grid-cols-3 py-8'>
        {entries?.map((challenge) => (
            <div key={challenge.id}  className="bg-white shadow-xl rounded-lg text-gray-900 my-6">
                <div className="mx-auto w-full h-64 relative -mt-6 border-4 border-white rounded-xl overflow-hidden">
                    <Image className="object-cover object-center h-32" alt="Post image"
                            fill 
                            src={challenge.image as string} 
                    />
                </div>
                <p className="text-gray-600 font-bold text-center text-1xl mt-2">{challenge.title}</p>
                <div className="flex justify-center items-center text-center mt-2">
                                {/* <FaPhoneVolume className='text-blue-900 mr-2' size={18}/> */}
                                <p className='text-gray-600'>{JSON.stringify(challenge.description)}</p>
                </div>
                <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                    <li className="flex flex-col items-center justify-around">
                        {/* <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg> */}
                        <div>2k</div>
                    </li>
                    <li className="flex flex-col items-center justify-between">
                        <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                        </svg>
                        <div>10k</div>
                    </li>
                    <li className="flex flex-col items-center justify-around">
                        <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                        </svg>
                        <div>15</div>
                    </li>
                </ul>
                <div className="p-4 border-t mx-8 mt-2">
                    <Link href={`/challenges/${challenge.id}`}>
                        <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Challenge</button>
                    </Link>  
                </div>
            </div>
        ))}
    </div> 
  )
}

export default Challenges