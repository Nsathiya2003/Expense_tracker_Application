import { useState } from "react";
import type { FormData } from "../types/types";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";



export default function Register(){
    const [data,setData] = useState<FormData>({
        username:'',
        mobileNumber:'',
        emailId:'',
        password:'',
        lastname:''
    });
    const [passwordVisible,setPasswordVisible]= useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value} = event.target;
        setData((prev) => ({
            ...prev,
            [name as keyof FormData]: value
        }));
    }

    const handleSubmit = (   event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    }

    return(
    <>
    <div className="register-container flex justify-center items-center h-screen">
        <div className="bg-[#548f54] w-[28%] h-100 relative">
         <form action="submit" onSubmit={handleSubmit} className="flex flex-col gap-4 p-20 ">
            <h1 className="text-center text-xl font-semibold text-light-grey">SIGN UP</h1>
            <p className="text-center text-red-700 font-semibold">Already have an account?<a href="/login" className="text-blue-800 font-semibold">login</a></p>
            
            <input type="text"
             name="username"
             id="username"
             value={data.username} 
             onChange={handleChange}
             placeholder="Enter your first name" 
             className="w-full p-2 pr-10 rounded-xl text-sm  border border-[#5A5A5A]  placeholder:text-gray-400"
             />

            <input type="text"
             name="lastname"
             id="lastname"
             value={data.lastname} 
             onChange={handleChange}
             placeholder="Enter your last name" 
             className="w-full p-2 rounded-xl text-sm"
             />

            <input type="text" 
             name="mobileNumber" 
             id="mobileNumber" 
             value={data.mobileNumber} 
             onChange={handleChange} 
             placeholder="Enter your mobile No" 
                className="w-full p-2 pr-10 rounded-xl text-sm  border border-[#5A5A5A]  placeholder:text-gray-400"

             />

            <input type="text" 
             name="emailId" 
             id="emailId" 
             value={data.emailId} 
             onChange={handleChange} 
             placeholder="Enter your EmailId"
                className="w-full p-2 pr-10 rounded-xl text-sm  border border-[#5A5A5A] placeholder:text-gray-400"
             />

           <div className="relative w-full">
            {!passwordVisible ? (
                <>
                 <input
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 pr-10 rounded-xl text-sm  border border-[#5A5A5A]  placeholder:text-gray-400"
            />
            
            <FaEye onClick={()=>setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
            />
            </>
            ) : (
                <>
                       <input
                type="text"
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 pr-10 rounded-xl text-sm  border border-[#5A5A5A]  placeholder:text-gray-400"
            />
            <FaEyeSlash
             onClick={()=>setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
            />
                </>
           
            )}
           
            </div>

            <button type="submit" className="bg-[#2C2C2C] w-full h-10 rounded-full hover:bg-[#5B3256] transition all text-white">Create Account</button>
        </form>
        </div>
    </div>
    </>
    )
}