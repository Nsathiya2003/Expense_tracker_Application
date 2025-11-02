import type React from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword(){
    const navigate = useNavigate();

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/reset-password')
    }
    return (
        <>
        <div className="forgot-container flex justify-center items-center min-h-screen px-4">
            <div className=" bg-[#548f54] w-full max-w-md lg:w-[400px] md:max-w-xl sm:max-w-lg rounded-2xl shadow-lg">
                <form action="submit" onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 sm:p-10 md:p-14 lg:p-16">
                    <h1 className="text-center text-white text-xl font-bold">FORGOT PASSWORD</h1>
                    <input 
                    type="text" 
                    name="emailId" 
                    id="emailId" 
                    placeholder="Enter your EmailId"
                    className="w-full p-2 rounded-lg text-sm border border-gray-400 placeholder-gray-400"
                    />
                    <button className="bg-[#2C2C2C] w-full h-11 rounded-full text-white font-semibold hover:bg-[#5B3256] transition-all duration-300">Sent Otp</button>
                </form>
            </div>
        </div>
        </>
    )
}