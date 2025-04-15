'use client'
import { SchoolData } from "@/types/challengeData"
import axios from 'axios'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const inputClass = 'w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300';

const FormNewPost = () => {

    const [formData, setFormData] = useState<SchoolData>({
        schoolName: '',
        schoolDesc: '',
        address : '',
        telephone : '',
        websiteUrl: '',
        location: '',
        image: '',
    });

    const [submitting, setIsSubmitting] = useState(false);
    const { data } = useSession();
    const router = useRouter();

    const handleStateChange = (fieldName: keyof FormData, value: string) => {
        setFormData((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    }

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

            // handleStateChange("image", result)
        };
    };



    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        setIsSubmitting(true);
        try{
            const response = await axios.post('api/posts', formData);
            if(response.status  === 200) {
                router.push("/schools");
            }
        } catch (error){
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const type = "Create";

    return (
        <div className="my-8 bg-[#] p-4 rounded-md">
            <form onSubmit={handleSubmit} className="flexStart form">
                <div className="form_image-container">
                    <label htmlFor="poster" className="flexCenter form_image-label">
                        {!formData.image && 'Choose a poster for your project'}
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept='image/*'
                        required={ type ? true : false}
                        className="form_image-input"
                        onChange={(e) => handleChangeImage(e)}
                    />
                    {formData.image && (
                        <Image
                            src={formData?.image}
                            className="sm:p-10 object-contain z-20" alt="image"
                            fill
                        />
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 p-2">
                    {/* this is the left form side  */}
                    <div className='flex justify-center items-center m-2'>
                        <input type="text" 
                            className={inputClass} 
                            placeholder="Enter School Name" 
                            name='schoolName'
                            value={formData.schoolName}
                            onChange={handleChange}
                        />
                    </div>
                    {/* this is the right form side  */}
                    <div className='flex justify-center items-center m-2'>
                        <input type="text" 
                            className={inputClass} 
                            placeholder="Enter School Address" 
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 p-2">
                    {/* this is the left form side  */}
                    <div className='flex justify-center items-center m-2'>
                        <input type="text" 
                            className={inputClass} 
                            placeholder="Enter School Contact Number" 
                            name='telephone'
                            value={formData.telephone}
                            onChange={handleChange}
                        />
                    </div>
                    {/* this is the right form side  */}
                    <div className='flex justify-center items-center m-2'>
                        <input type="text" 
                            className={inputClass} 
                            placeholder="Enter School Location" 
                            name='location'
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="w-full p-4">
                    <ReactTextareaAutosize 
                        minRows={5} 
                        name='schoolDesc' 
                        className={inputClass}
                        placeholder="Enter School Description"
                        value={formData.schoolDesc}
                        onChange={handleChange}
                    />
                </div>

                <div className="px-4">
                    <button 
                        className="bg-blue-500 
                        hover:bg-blue-600 text-white font-blod py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
                        type="submit">
                        {submitting ? `${type}ing...` : type}
                    </button>
                </div>
                
                </form>
        </div>
    )
}

export default FormNewPost