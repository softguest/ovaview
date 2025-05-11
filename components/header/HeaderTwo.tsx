"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { UserButton } from "@/components/auth/user-button";
import { MobileMenu } from "@/components/auth/mobile-menu";
import {useSession} from 'next-auth/react'
import SearchBar from '../searchBar/SearchBar';
import { FaHouse, FaUsers } from 'react-icons/fa6';

const HeaderTwo = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const {data: session} = useSession()
    const pathname = usePathname();
  return (
        <nav className="bg-slate border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="px-4 md:px-8 lg:px-32 flex flex-wrap items-center justify-between p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Link href="/dashboard">
                        <div className='text-slate-500 block font-bold text-2xl border border-slate-400 py-1 px-2 rounded-sm h-full'>W</div>
                    </Link>
                    <SearchBar />
                </div>
                
                <div className="" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium md:p-0 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                        {session?.user?.email ? (
                            <div className="hidden md:flex items-center gap-x-4 md:display">
                                <Link href="/dashboard" className='space-x-1 text-slate-700 hover:font-bold hover:text-slate-500 flex items-center justify-center'>
                                   <FaHouse /> <div>Home</div>
                                </Link>
                                <Link href="dashboard/writer" className='space-x-1 text-slate-700 hover:font-bold hover:text-slate-500 flex items-center justify-center'>
                                    <FaUsers /> 
                                    <div>Profile</div>
                                </Link>
                                <UserButton />
                            </div>
                            ) : ( 
                            <Link href="/register">
                                <Button variant="secondary" size="lg">
                                    Register
                                </Button>
                            </Link>
                            )
                        }    
                    </ul>
                </div>
                <div className="md:hidden">
                    {session?.user?.email ? (
                        <MobileMenu />
                        ) :(
                            <></>
                        )
                    } 
                </div>
            </div>
        </nav>
  )
}

export default HeaderTwo
