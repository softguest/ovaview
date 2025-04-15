import { Editor } from '@/components/Editor';
import FormProject from '@/components/formProject/FormProject';
import Projects from '@/components/projects/Projects';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import React, { FC } from 'react'

interface BlogDetailPageProps {
  params: {
    id: string,
    schName: string
  }
}

const BlogDetailedPage: FC<BlogDetailPageProps> = async ({ params }) => {
  const user = await currentUser();
  
  const challenge = await db?.challenge.findFirst({
    where: {
        id: params.id
    },
    include: {
        author: true,
    },
  });

  return (
    <div className='min-h-full'> 
        <Card className=''>
          <div className='md:border md:border-collapse md:border-slate-400 rounded-lg'>
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="">
                  <center>
                    <img src={challenge?.image as string} className='w-full rounded-lg border-4' alt="" />
                  </center>
                </div>
                <div className="mb-4 p-2 bg-slate-100 rounded-lg">
                    <h3 className='py-2 px-4 font-semibold'>{challenge?.title?.replace(/\b\w/g, match => match.toUpperCase())}</h3>
                    <h1 className='py-2 text-xs px-4 text-1xl font-semibold'>This Account Role Is: <span className = 'text-[#2e9865] text-sm px-2 py-1'>{challenge?.author?.role}</span></h1>
                </div>
              </div>
            </div>
            <div className="">
                <p className='text-slate-400 ml-2 font-semibold my-4'>Published By: {challenge?.author?.firstName?.toUpperCase()} {challenge?.author?.lastName?.toUpperCase()}</p>
                {/* <div className='grid md:grid-cols-2 my-2 p-3 bg-slate-100'>
                    <h4>challenge Address: </h4>
                    <h4><em>{challenge?.address}</em></h4>
                </div>
                <div className="grid md:grid-cols-2 my-2 p-3">
                    <h4>challenge Location: </h4>
                    <h4><em>{challenge?.location}</em></h4>
                </div>
                <div className="grid md:grid-cols-2 my-2 p-3 bg-slate-100">
                    <h4>challenge Email Address:</h4>
                    <h4>{challenge?.author?.email}</h4>
                </div>
                <div className="grid md:grid-cols-2 my-2 p-3">
                    <h4>challenge Contact:</h4>
                    <h4><em>{challenge?.telephone}</em></h4>
                </div> */}
                <div className="grid  md:grid-cols-2 mt-2 p-4 bg-slate-100 rounded-md">
                  <h4 className='my-2 font-bold text-1xl'>challenge Description: </h4>
                  {/* <p className='h-4'><em>{challenge?.challengeDesc}</em></p> */}
                  <Button className='my-2'>challenge Details</Button>
                </div>
            </div>
          </div>

          {challenge?.authorId === user?.id ? (
              <div className="">
                <FormProject challengeId={params.id} challengeTitle={challenge?.title?.replace(/\b\w/g, match => match.toUpperCase()) as string}/> 
                {/* <div className="">
                    <Editor challengeId={params.id}/>
                    <div className='w-full flex justify-end'>
                        <Button type='submit' className='w-full' form='subreddit-post-form'>
                          Post
                        </Button>
                    </div>
                </div>     */}
              </div>
            ) :(
                <div></div>
            )
          } 
        </Card>
    </div>
  )
}

export default BlogDetailedPage