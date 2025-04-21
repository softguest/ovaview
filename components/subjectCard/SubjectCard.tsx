"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface SubjectCardProps {
  imageUrl: string
  subjectTitle: string
  subjectDescription: string
  classTitle: string
  link:      string
  bgColor:   string
  // onExplore: () => void
}

export default function SubjectCard({
  imageUrl,
  subjectTitle,
  subjectDescription,
  classTitle,
  link,
  bgColor
  // onExplore,
}: SubjectCardProps) {
  return (
    <Card className="w-full transition">
      <div className="relative bg-white shadow-lg w-full h-48 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={subjectTitle}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-slate-400 text-2xl text-center text-white font-bold">
            {subjectTitle}
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{subjectTitle}</h2>
        <div className="flex items-center justify-between"> 
          <div className="text-sm font-medium text-primary">Level:</div> <div className="font-bold">{classTitle}</div>
        </div>
        <p className="text-gray-600 text-sm">{subjectDescription}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={link}>
          <Button 
            className="w-full border-"
          >
            Explore
          </Button>
        </Link>  
      </CardFooter>
    </Card>
  )
}
