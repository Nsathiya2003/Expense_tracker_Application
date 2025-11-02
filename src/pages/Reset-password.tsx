import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword(){
      const [data,setData] = useState({
           otp:'',
           password:'',
           confirm_password:'',

       });
       const [passwordVisible,setPasswordVisible]= useState(false);
       const [confirmPasswordVisible,setConfirmPasswordVisible]= useState(false);

   
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
    return (
        <>
        <div className="reset-container flex justify-center items-center min-h-screen">
            <div className="bg-[#548f54] w-full max-w-md md:max-w-xl lg:max-w-[400px] rounded-2xl shadow-lg">
                <form action="submit" onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 p-16 md:10 lg:18 sm-12">
                    <h1 className="text-white font-bold text-center text-xl">RESET PASSWORD</h1>
                    <input
                     type="text"
                     id="otp"
                     name="otp"
                     placeholder="Enter 6 digits otp"
                     value={data.otp}
                     onChange={handleChange}
                     className="w-full p-3 pr-10 rounded-lg text-sm border border-gray-400 placeholder-gray-600"

                     />
                      <div className="relative w-full">
                           <input
                             type={passwordVisible ? "text" : "password"}
                             name="password"
                             id="password"
                             value={data.password}
                             onChange={handleChange}
                             placeholder="New password"
                             className="w-full p-3 pr-10 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
                           />
                           {passwordVisible ? (
                             <FaEyeSlash
                               onClick={() => setPasswordVisible(!passwordVisible)}
                               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
                             />
                           ) : (
                             <FaEye
                               onClick={() => setPasswordVisible(!passwordVisible)}
                               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
                             />
                           )}
                     </div>
                     <div className="relative w-full">
                           <input
                             type={confirmPasswordVisible ? "text" : "password"}
                             name="confirm_password"
                             id="confirm_password"
                             value={data.confirm_password}
                             onChange={handleChange}
                             placeholder="Confirm password"
                             className="w-full p-3 pr-10 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
                           />
                           {confirmPasswordVisible ? (
                             <FaEyeSlash
                               onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
                             />
                           ) : (
                             <FaEye
                               onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
                             />
                           )}
                    </div>

                    <button className="bg-[#2C2C2C] w-full h-11 rounded-full text-white font-semibold hover:bg-[#5B3256] transition-all duration-300">Reset Password</button>
                </form>
            </div>
        </div>
        </>
    )
}