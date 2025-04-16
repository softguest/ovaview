"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { UserButton } from "@/components/auth/user-button";
import { MobileMenu } from "@/components/auth/mobile-menu";
import {useSession} from 'next-auth/react'
import SearchBar from '@/components/searchBar/SearchBar';
import { getSession } from 'next-auth/react';

const HeaderTwo = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const {data: session} = useSession()
    const pathname = usePathname();
  return (
        <nav className="bg-slate-600 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="px-4 md:px-8 lg:px-32 flex flex-wrap items-center justify-between p-4">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <Link href="/dashboard">
                        <h2 className='text-white hidden md:block font-extrabold text-2xl'>😆Weekly</h2>
                    </Link>
                    {session?.user?.email ? (
                        <SearchBar />
                        ) :(
                            <div></div>
                        )
                    } 
                </div>
                <div className="md:hidden">
                    <MobileMenu />
                </div>
                
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                    {session?.user
                        ? (
                        <div className="flex items-center gap-x-3 md:display">

                            <Link href="/dashboard" className='text-white font-bold'>
                                Home
                            </Link>

                            <Link href="/settings" className='text-white font-bold'>
                                Profile
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
            </div>
        </nav>
  )
}

export default HeaderTwo
