import { db } from '@/lib/db';
import Image from 'next/image';
import Logo from "@/assets/images/school-logo.png"
import Link from 'next/link';
import React, { FC } from 'react'
import { FaPhoneVolume } from 'react-icons/fa';
interface ProfileSchoolsProps {
        userId: string 
  }

const ProfileSchools: FC<ProfileSchoolsProps> = async ({ userId }) => {
    const userSchools = await db?.challenge.findMany({
        where: {
            authorId: userId,
        },
        include: {
            author: true,
        },
    });
  return (
    <div className=''>
        <h1 className='text-3xl font-bold mb-4'>
            Projects Created By this Profile.
        </h1>
        <hr className='my-4'/>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4'>
            {userSchools.map((project) => (
                <Link key={project.id} href={`/schools/${project.id}`} className='bg-slate-200 p-4 rounded-md shadow-md '>
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className=' grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 border-e-blue-200 mb-4'>
                        {/* this is the left side information  */}
                        <div className="pt-2">
                            <div className='flex items-center space-x-4 text-blue-500 font-bold my-4 '> 
                                <FaPhoneVolume size={26}/>
                                <p className=''>{project.title}</p>
                            </div>
                            <p className='py-1'>By: <em><b>{project.author?.firstName} {project.author?.lastName}</b></em></p>
                            {/* <p className='py-1'>Location: <b>{project.location}</b></p>
                            <p className='py-1'>Address: <b>{project.address}</b></p> */}
                        </div>
                        {/* this is the right side containing the image  */}
                        <div className="">
                            <Image src={Logo} width={100} height={100} className='w-full border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-md' alt=''/>
                        </div>
                    </div>
                    {/* this is the school name  */}
                    <h3 className="bg-slate-500 text-white text-center font-semibold py-1 rounded-sm">{project.challengeType}</h3>
                </div>
            </Link>
            ))}
            
        </div>
    </div>
  )
}

export default ProfileSchools