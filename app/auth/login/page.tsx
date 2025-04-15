"use client"
import { Poppins } from "next/font/google";
import Logo from "@/assets/images/school-logo.png"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FormNewPost from "@/components/form-new-post/FormNewPost";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import AboutSec from "@/components/aboutSec/AboutSec";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function LoginPage() {
  return (
    // <main className="flex h-full flex-col">
    <main className="flex flex-col">
        <section className=''>
          <div>
              {/* the left side side of the page  */}
              {/* <div className='flex justify-center items-center'>
                <div className="space-y-4 px-4 md:px-32 text-center hidden md:block">
                  <center>
                      <Image className="" src={Logo} width={170} height={170} alt=""/>
                  </center>
                    <h1 className={cn(
                              "text-4xl font-semibold text-sky-600 drop-shadow-md",
                              font.className,
                            )}>
                              Get Started!
                    </h1>
                    <h4 className="font-semibold text-2xl text-sky-600 ">A Gateway To An Easy Student Admition Portal With Records Tracking.</h4>
                    <p className=" text-[16px] text-slate-500">Tired of paper forms, endless queues, & The Hassle Of Traditional School Registration?  Yoollaa Is Here To Revolutionize The Way You Apply & Get Admited into any School!</p>
                </div>
              </div> */}
              {/* the right side of the page  */}
              <div className=' bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white to-slate-200 flex justify-center items-center py-16'>
                  <div className="space-y-6 text-center py-4 md:px-20">
                      {/* create new school form  */}
                      <LoginForm />
                  </div> 
              </div>
          </div>
          {/* read more about Yoollaa  */}
          <AboutSec />
        </section>
    </main>
  )
}
