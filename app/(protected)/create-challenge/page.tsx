'use client'

import React,{ChangeEvent, FormEvent, useMemo, useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Input from '@/components/input/Input'
import ImageUpload from '@/components/uploadImage/ImageUpload'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface InitalStateProps {
    title: string,
    description: string, 
    image : string, 
    challengeType : string,
    startDate : '',
    endDate : '',
    reward : string,
    visibility : boolean,
}
const initialState:InitalStateProps = {
        title: '',
        description: '',
        image: '',
        challengeType : '',
        startDate : '', // Initialize with a valid Date object
        endDate : '', // Initialize with a valid Date object
        reward : '',
        visibility : false, // Initialize with a boolean value
}


export default function CreateSchool() {

    const [state,setState] = useState(initialState)
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    const onSubmit = (event:FormEvent) => {

        setIsLoading(true)

        event.preventDefault()

        axios.post('/api/challenge', state)
        .then(() => {
            toast.success('Created successfully')
            router.refresh()
            router.push('/dashboard')
        })

        .catch(() => {
            toast.error('Went wring') 
        }).finally(() => {
            setIsLoading(false)
        })
    }
	function handleChange(event:ChangeEvent<HTMLInputElement> ) {
		setState({ ...state, [event.target.name]: event.target.value});
	}
    const setCustomValue = (id:any, value:any) => {
        setState((prevValues) => ({
          ...prevValues,
          [id]: value,
        }));
      };


    

  return (
 
        <Card className='p-4 md:p-8'>
            <form onSubmit={onSubmit} >
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="m-4">
                        <ImageUpload value={state.image} onChange={(value) => setCustomValue('image',value)}/>
                    </div>
                    <div  className='flex flex-col justify-center m-4 gap-4'>
                        <input className="" placeholder='School Name' id='title' type='text' value={state.title.toLowerCase()} name='title' onChange={handleChange}/>
                        <textarea placeholder='Description' id='description' rows={5} value={state.description} name='description' onChange={handleChange} ></textarea>
                        <input placeholder='challengeType' id='challengeType' type='' value={state.challengeType} name='challengeType' onChange={handleChange}/>
                        <input id='startDate' type='date' value={state.startDate} name='startDate' onChange={handleChange}/>
                        <input id='endDate' type='date' value={state.endDate} name='endDate' onChange={handleChange}/>
                        <input placeholder='Reward' id='reward' type='text' value={state.reward} name='reward' onChange={handleChange}/>
                        <div>
                            <span className='mr-4'>Challenge Visibility</span>
                            <input
                            placeholder='Location'
                            id='visibility'
                            type='checkbox'
                            checked={state.visibility}
                            name='visibility'
                            onChange={(e) => setState({ ...state, visibility: e.target.checked })}
                            />
                        </div>
                        <Button type='submit' disabled={isLoading}>Submit</Button>
                    <div> 
                </div>
                </div>
                
                </div>
            </form>
        </Card>
  
  )
}