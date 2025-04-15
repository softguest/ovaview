// import { db } from '@/lip/db';
import { Card } from '../ui/card'
import Logo from "@/assets/images/school-logo.png"
import Image from 'next/image'
import { FaPhoneVolume } from 'react-icons/fa'
import { FC } from 'react';
import { SchoolModel, User } from '@prisma/client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { currentRole } from '@/lib/auth';


interface SearchProps {
    entries: Array<SchoolModel>;
  }

const SchoolComponent: FC<SearchProps> = async ({ entries }) => {
    const userRole = await currentRole();
    return (
        <div className='bg-slate-100 px-4 py-8 grid grid-cols-1 min-h-full md:py-8 xl:px-32'>
            <div className='p-4 md:p-8'>
                <div className="flex justify-between">
                    <div className="">
                        <h1 className='text-1xl xl:text-4xl font-bold mb-4'>
                            Challenges
                        </h1>
                    </div>
                    <div className="">
                        {userRole === "SCHOOL" ? (
                            <Link href="/create-school">
                                <Button variant="outline" size="lg">🏢 Create Challenge</Button>
                            </Link>
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                </div>
                <hr className='mb-6'/>
                <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
                    {entries.map((school) => (
                        <div key={school.id}  className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-8 bg-white shadow-xl rounded-lg text-gray-900">
                            <div className="rounded-t-lg h-32 overflow-hidden">
                                <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
                            </div>
                            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                                <Image className="object-cover fill object-center h-32" src={school.image as string} alt='Woman looking front'/>
                            </div>
                            <p className="text-gray-500 text-center text-1xl">{school.schoolName}</p>
                            <div className="flex justify-center items-center text-center mt-2">
                                            <FaPhoneVolume className='text-blue-900 mr-2' size={18}/>
                                            <p className=''>{school.telephone}</p>
                            </div>
                            <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                                <li className="flex flex-col items-center justify-around">
                                    <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path
                                            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
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
                                <Link href={`/schools/${school.id}`}>
                                    <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">More InFo</button>
                                </Link>  
                            </div>
                        </div>
                    ))}
                </div> 
            </div>
        </div>
      )
}

export default SchoolComponent