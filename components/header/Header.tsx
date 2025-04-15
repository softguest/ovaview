"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { UserButton } from "@/components/auth/user-button";
import {signIn, signOut, useSession} from 'next-auth/react'

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const {data: session} = useSession()
    const pathname = usePathname();
  return (
    <nav className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-slate-500 to-slate-700 flex justify-between items-center py-4 px-4 md:px-32 w-full shadow-sm">
      {session?.user
              ? (
                <div className="flex gap-x-2 md:display">
                  <Button 
                    asChild
                    variant={pathname === "/schools" ? "default" : "outline"}
                  >
                    <Link href="/schools">
                      Schools
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant={pathname === "/admin" ? "default" : "outline"}
                  >
                    <Link href="/registration">
                      Apply
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant={pathname === "/profiles" ? "default" : "outline"}
                  >
                    <Link href="/profiles">
                      Profiles
                    </Link>
                  </Button>
                </div>
        ) : ( 
          <Link href="/">
            <h2 className='text-white font-extrabold text-2xl'>Weekly 😆</h2>
          </Link>
          )
        } 
      
      <div className="flex space-x-2">
      {session?.user
              ? (
        <UserButton />
        ) : ( 
          <LoginButton  asChild>
            <Button variant="secondary" size="lg">
                Sign in
            </Button>
          </LoginButton>
          )
        }    
        
      </div>
    </nav>
  )
}

export default Header