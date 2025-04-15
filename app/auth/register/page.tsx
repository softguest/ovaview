
import { Poppins } from "next/font/google";
import { RegisterForm } from "@/components/auth/register-form";
import Logo from "@/assets/images/school-logo.png"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AboutSec from "@/components/aboutSec/AboutSec";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

const RegisterPage = () => {
  return ( 
    
    <main className="flex flex-col">
      <section className=''>
        {/* read more about Yoollaa  */}
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2'>
            {/* the left side side of the page  */}
            <div className='flex justify-center items-center'>
              <div className="space-y-4 px-12 md:px-32 text-center hidden md:block">
                <center>
                    <Image className="" src={Logo} width={170} height={170} alt=""/>
                </center>
                  <h1 className={cn(
                            "text-4xl font-bold text-sky-600 drop-shadow-md",
                            font.className,
                          )}>
                            Get Started!
                  </h1>
                  <h4 className="font-semibold text-2xl text-sky-600 ">A Gateway To Easy Online Student Application, Registration and Admition.</h4>
                  <p className=" text-[16px] text-slate-500 ">Tired of paper forms, endless queues, & The Hassle Of Traditional School Registration?  Yoollaa Is Here To Revolutionize The Way You Apply & Get Admited into any School!</p>
              </div>
            </div>
            {/* the right side of the page  */}
            <div className=' bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white to-slate-200 flex justify-center items-center py-16'>
                <div className="space-y-6 text-center py-4 md:px-20">
                    {/* create new school form  */}
                    <RegisterForm />
                </div> 
            </div>
            
        </div>
        <AboutSec />
      </section>
    </main>
  );
}
 
export default RegisterPage;