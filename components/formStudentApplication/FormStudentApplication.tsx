"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FC, useState } from 'react'
import { Card } from '../ui/card';

const inputClass = 'w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300';
interface FormStudentRegistrationProps {
    registrationId: string;
}

const FormStudentApplication: FC<FormStudentRegistrationProps> = ({ registrationId }) => {
    const [provideFullNamesAsProvidedOnYourCertificate, setProvideFullNamesAsProvidedOnYourCertificate] = useState<string>('');
    const [graduateType, setGraduateType] = useState<string>('');
    const [programmeOfStudy, setProgrammeOfStudy] = useState<string>('');
    const [admissionYear, setAdmissionYear] = useState<string>('');
    const [graduationOrLastStudyYear, setGraduationOrLastStudyYear] = useState<string>('');
    const [thesisTopic, setThesisTopic] = useState<string>('');
    const router = useRouter();

    const handleProvideFullNamesAsProvidedOnYourCertificateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProvideFullNamesAsProvidedOnYourCertificate(e.target.value);
    }

    const handleGraduateTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGraduateType(e.target.value);
    }

    const handleProgrammeOfStudyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProgrammeOfStudy(e.target.value);
    }

    const handleAdmissionYearChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAdmissionYear(e.target.value);
    }

    const handleGraduationOrLastStudyYearChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGraduationOrLastStudyYear(e.target.value);
    }

    const handleThesisTopicChange = (e: ChangeEvent<HTMLInputElement>) => {
        setThesisTopic(e.target.value);
    }

const handleSubmitStudentApplication = async () => {
    if(
        provideFullNamesAsProvidedOnYourCertificate.trim() !== '' ||
        graduateType.trim() !== '' ||
        programmeOfStudy.trim() !== '' ||
        admissionYear.trim() !== '' ||
        graduationOrLastStudyYear.trim() !== '' ||
        thesisTopic.trim() !== ''
        ) {

        try{
            const newRegistration = await axios.post('/api/studentApplication', {
                registrationId,
                provideFullNamesAsProvidedOnYourCertificate,
                graduateType,
                programmeOfStudy,
                admissionYear,
                graduationOrLastStudyYear,
                thesisTopic
            });

            if(newRegistration.status === 200) {
                router.refresh();
            }
            
        } catch (error){
            console.error(error)
        }
    }
}    
  return (
    <div className="my-8 bg-white p-8 rounded-md">
        {/* <Card className="p-8"> */}
            <form onSubmit={handleSubmitStudentApplication}>
                <div className='mt-4'>
                    <label htmlFor='comment' className='block mb-2 text-gray-700 text-sm font-bold '>Full Names:</label>
                    <input 
                        value={provideFullNamesAsProvidedOnYourCertificate}
                        onChange={handleProvideFullNamesAsProvidedOnYourCertificateChange}
                        type="text"
                        className={inputClass}
                        name='provideFullNames'
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor='graduateType' className='block mb-2 text-gray-700 text-sm font-bold '>Graduate Type:</label>
                    <input 
                        value={graduateType}
                        onChange={handleGraduateTypeChange}
                        type="text"
                        className={inputClass}
                        name='graduateType'
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor='programmeOfStudy' className='block mb-2 text-gray-700 text-sm font-bold '>Programme Of Study:</label>
                    <input 
                        value={programmeOfStudy}
                        onChange={handleProgrammeOfStudyChange}
                        type="text"
                        className={inputClass}
                        name='ProgrammeOfStudy'
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor='admissionYear' className='block mb-2 text-gray-700 text-sm font-bold '>Admission Year:</label>
                    <input 
                        value={admissionYear}
                        onChange={handleAdmissionYearChange}
                        type="text"
                        className={inputClass}
                        name='admissionYear'
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor='graduationOrLastStudyYear' className='block mb-2 text-gray-700 text-sm font-bold '>Graduation OrLast Study Year:</label>
                    <input 
                        value={graduationOrLastStudyYear}
                        onChange={handleGraduationOrLastStudyYearChange}
                        type="text"
                        className={inputClass}
                        name='graduationOrLastStudyYear'
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor='thesisTopic' className='block mb-2 text-gray-700 text-sm font-bold '>Thesis Topic:</label>
                    <input 
                        value={thesisTopic}
                        onChange={handleThesisTopicChange}
                        type="text"
                        className={inputClass}
                        name='thesisTopic'
                    />
                </div>
                <button
                    type='submit' 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-blod mt-5 py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 disabled:bg-gray-400"
                    >Apply</button>
            </form>   
        {/* </Card> */}
    </div>
  )
}

export default FormStudentApplication;