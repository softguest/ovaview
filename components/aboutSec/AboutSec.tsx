import Link from "next/link";
import { Button } from "@/components/ui/button";

const AboutSec = () => {
  return (
      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100 to-slate-400 text-slate-700 text-center py-24">
          <div className="space-y-4 px-4">
            <h1 className="text-4xl font-bold">How Weekly Works.</h1>
            <div className="text-1xl pb-4"><em>To See The Full Picture Of Weekly & Understand Its Core Features.</em></div>
            <Link href="/about" className="mt-4">
              <Button size="lg" variant="secondary" className="">Read More!</Button>
            </Link>
          </div>
      </div>
  )
}

export default AboutSec