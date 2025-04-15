"use client"

import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';

import FormField from './(testcomponents)/FormField';
import { Button } from '@/components/ui/button';
import CustomMenu from './(testcomponents)/CustomMenu';
// import { categoryFilters } from '@/constant';
// import { updateProject, createNewProject, fetchToken } from '@/lib/actions';
import { ProjectInterface, SessionInterface } from '@/common.types';

import axios from 'axios';
import { ExtendedUser } from '@/next-auth';
import { ChallengeData } from '@/types/challengeData';

type Props = {
    type: string,
    session: ExtendedUser,
    project?: ChallengeData
}

const  ChallengeForm = ({ type, session, project }: Props) => {
    const router = useRouter()

    // const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState<ChallengeData>({
        title: project?.title || "",
        description: project?.description|| "",
        image: project?.image || "",
        // websiteUrl: project?.websiteUrl || "",
        // location: project?.location || "",
        // address: project?.address || "",
        // telephone: project?.telephone || "",
    })

    const handleStateChange = (fieldName: keyof ChallengeData, value: string) => {
        setForm((prevForm: any) => ({ ...prevForm, [fieldName]: value }));
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;
 
        if (!file.type.includes('image')) {
            alert('Please upload an image!');

            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;

            handleStateChange("image", result)
        };
    };

    // const handleFormSubmit = async (e: FormEvent) => {
    //     e.preventDefault();

    //     setSubmitting(true)

    //     const { token } = await fetchToken()

    //     try {
    //         if (type === "create") {
    //             await createNewProject(form, session?.user?.id, token)

    //             router.push("/")
    //         }
            
    //         if (type === "edit") {
    //             await updateProject(form, project?.id as string, token)

    //             router.push("/")
    //         }

    //     } catch (error) {
    //         alert(`Failed to ${type === "create" ? "create" : "edit"} a project. Try again!`);
    //     } finally {
    //         setSubmitting(false)
    //     }
    // }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        setIsSubmitting(true);
        try{
            const response = await axios.post('api/challenge', form);
            if(response.status  === 200) {
                router.push("/challanges");
            }
        } catch (error){
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image && 'Choose a poster for your project'}
                </label>
                <input
                    id="image"
                    type="file"
                    accept='image/*'
                    required={type === "create" ? true : false}
                    className="form_image-input"
                    onChange={(e) => handleChangeImage(e)}
                />

                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20" alt="image"
                        fill
                    />
                )}
            </div>

            <FormField
                title="Challenge Title"
                state={form.title}
                placeholder="Flexibble"
                setState={(value) => handleStateChange('title', value)}
            />

            <FormField
                title='Description'
                state={form.description}
                placeholder="Showcase and discover remarkable developer projects."
                isTextArea
                setState={(value) => handleStateChange('description', value)}
            />

            {/* <FormField
                type="text"
                title="Address"
                state={form.address}
                placeholder="Address of School"
                setState={(value) => handleStateChange('address', value)}
            />

            <FormField
                type="tel"
                title="Contact Number"
                state={form.telephone}
                placeholder="+237, +000"
                setState={(value) => handleStateChange('telephone', value)}
            />

            <FormField
                type="url"
                title="Website Url"
                state={form.websiteUrl}
                placeholder="www.school-website.com"
                setState={(value) => handleStateChange('websiteUrl', value)}
            />

            <FormField
                type="address"
                title="location"
                state={form.location}
                placeholder="+237, +000"
                setState={(value) => handleStateChange('location', value)}
            /> */}

            {/* <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            /> */}

            <div className="flexStart w-full">
                {/* <Button
                    title={submitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit"
                    // leftIcon={submitting ? "" : "/plus.svg"}
                    submitting={submitting}
                /> */}
                 <button 
                        className="bg-blue-500 
                        hover:bg-blue-600 text-white font-blod py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
                        type="submit">
                        {submitting ? `${type}ing...` : type}
                </button>
            </div>
        </form>
    )
}

export default ChallengeForm