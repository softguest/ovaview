import Link from "next/link";
import { Button } from "@/components/ui/button";

const AboutSec = () => {
  return (
      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#faa635] to-sky-600 text-white text-center py-24">
          <div className="space-y-4 px-4">
            <h1 className="text-4xl font-bold mb-4">How Yoollaa Works.</h1>
            <em className="text-1xl">To See the full Picture Yoollaa & Understand Its Core Features.</em><br />
            <Link href="/aboutus" className="mt-4">
              <Button size="lg" variant="secondary" className="">Read More!</Button>
            </Link>
          </div>
      </div>
  )
}

export default AboutSec