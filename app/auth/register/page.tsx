
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
        <div className=''>
            <div className=' bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white to-slate-200 flex justify-center items-center py-16'>
                <div className="space-y-6 text-center py-4 md:px-20">
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