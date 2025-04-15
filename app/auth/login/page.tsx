"use client"
import { Poppins } from "next/font/google";
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
              <div className=' bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white to-slate-200 flex justify-center items-center py-16'>
                  <div className="space-y-6 text-center py-4 md:px-20">
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
