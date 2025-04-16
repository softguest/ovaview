import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-slate-600 py-8'>
        <div className='flex justify-between items-center px-4 md:px-32'>
            <Link href='/' className='text-white text-1xl md:text-1xl font-bold'>
                Weekly Challenge
            </Link>
            <ul className='flex justify-between items-center space-x-6'>  
                <li>
                    <Link href='/aboutus'> 
                        <Button size="lg">
                            About Weekly!
                        </Button>
                    </Link> 
                </li>
            </ul>
        </div>
        {/* whatsapp click to chat button  */}
        <Link href="https://api.whatsapp.com/send?phone=673589999&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202." className="float" target="_blank">
            <FaWhatsapp className="my-float"/>
        </Link>
    </div>
  )
}

export default Footer;