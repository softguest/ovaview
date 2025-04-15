import { db } from "@/lib/db";
import { FC, useState } from "react";
import { format } from "date-fns"
import Link from "next/link";
import { FaPhoneVolume } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { currentUser } from "@/lib/auth";


interface RegistrationsProps {
  registrationId: string,
}

const Registrations: FC<RegistrationsProps> = async ({ registrationId }) => {
    const user = await currentUser();
    const studentApplications = await db?.studentApplication.findMany({
        where: {
        registrationId,
        },
        include: {
            author: true,
            registration: true
        },
    
    });


  return (
    <div className='py-8 mt-2'>
        <h2 className='text-3xl font-bold mb-2'>Admission Request Entries.</h2>
            <hr className="my-4"/>
            <div className="relative overflow-x-auto rounded-md">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Student Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Program
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Session
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Details 
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {studentApplications.map((studentApplication) => (
                        <tr key={studentApplication.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {studentApplication.author?.firstName}
                            </th>
                            <td className="px-6 py-4">
                                {studentApplication.className}
                            </td>
                            <td className="px-6 py-4">
                                {studentApplication.programmeOfStudy}
                            </td>
                            <td className="px-6 py-4">
                                {studentApplication.registration?.title}
                            </td>
                            <td className="px-6 py-4">
                                <Link key={studentApplication.id} href={`/studentApplications/${studentApplication.id}`}>
                                    <Button>Details</Button>
                                </Link>
                            </td>
                        </tr>
                        )) }
                    </tbody>
                </table>
            </div>

    </div>
  )
}

export default Registrations