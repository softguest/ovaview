"use client"
import { currentUser } from '@/lib/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FC, useState } from 'react'

const inputClass = 'w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300';
interface FormProjectProps {
    challengeId: string;
    challengeTitle: string;
}

const FormProject: FC<FormProjectProps> = ({ challengeId, challengeTitle }) => {
    const user = currentUser();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [github, setGithub] = useState<string>('');
    const [image, setImage] = useState<string>('');

    const router = useRouter();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const handleGithubChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGithub(e.target.value);
    }
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
    }


const handleSubmitRegistration = async () => {
    if(
        title.trim() !== ''
        ) {

        try{
            const newProject = await axios.post('/api/project', {
                challengeId,
                title,
                description,
                github,
                image,
            });
            if(newProject.status === 200) {
                router.refresh();
            }
            
        } catch (error){
            console.error(error)
        }
    }
}    
  return (
    <div className="my-8 bg-blue-50 p-8 rounded-md">
        <div className="font-bold my-4">Create A Registration Session For <span className="">{challengeTitle}</span></div>
        <hr/>
        <form onSubmit={handleSubmitRegistration }>
            <div className='mt-4'>
                <label htmlFor='title' className='block mb-2 text-gray-700 text-sm font-bold '>Add Academic Title</label>
                <input 
                    value={title}
                    onChange={handleTitleChange}
                    type="text"
                    className={inputClass}
                    name='title'
                />
            </div>
            <div className='mt-4'>
                <label htmlFor='year' className='block mb-2 text-gray-700 text-sm font-bold '>Registration Description</label>
                <input 
                    value={description} 
                    onChange={handleDescriptionChange}
                    type="text"
                    className={inputClass}
                    name='description'
                />
            </div>
            <div className='mt-4'>
                <label htmlFor='github' className='block mb-2 text-gray-700 text-sm font-bold '>Add a Git repo</label>
                <input 
                    value={github}
                    onChange={handleGithubChange}
                    type="text"
                    className={inputClass}
                    name='github'
                />
            </div>
            <div className='mt-4'>
                <label htmlFor='year' className='block mb-2 text-gray-700 text-sm font-bold '>Upload project Image</label>
                <input 
                    value={image}
                    onChange={handleImageChange}
                    type="text"
                    className={inputClass}
                    name='image'
                />
            </div>
            <button
                type='submit' 
                className="bg-blue-500 hover:bg-blue-600 text-white font-blod mt-5 py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 disabled:bg-gray-400"
                >Submit Project</button>
        </form>   
    </div>
  )
}

export default FormProject;